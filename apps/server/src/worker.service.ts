import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { CurrentPage } from './current-page.entity';
import { DramaService } from './modules/drama/drama.service';
import { Person } from './modules/person/entities/person.entity';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);
  private currentPage: number = 1;
  private movieIndex: number = 0;
  private apiKey =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzAyMDU0NjQwMTE1Mzk1Y2Q0OGQ5YjdiZjM2MDNkYyIsIm5iZiI6MTcyNzc1NDQyOS44MjYsInN1YiI6IjY2ZmI3MGJkZDgwNjQxNjViZGYxNjkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jJMoJK8UVkbx2ZQ9ZBCvjPpk_x22qeI83cB73gcWgzw';

  constructor(
    @InjectRepository(CurrentPage)
    private readonly currentPageRepository: Repository<CurrentPage>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    private readonly dramaService: DramaService,
  ) {}

  async onModuleInit() {
    this.logger.debug('Worker is starting on module initialization');
    await this.getCurrentPageFromDb();

    this.startCrawling();
  }

  private async startCrawling() {
    while (true) {
      try {
        await this.crawlMovie();
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        this.logger.error('Error during crawling:', error);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  }

  private async getCurrentPageFromDb(): Promise<number> {
    const currentPageEntity = await this.currentPageRepository.findOneBy({
      id: 1,
    });
    if (currentPageEntity) {
      this.currentPage = currentPageEntity.currentPage;
    }
    return this.currentPage;
  }

  private async saveCurrentPage(): Promise<void> {
    const currentPageEntity = await this.currentPageRepository.findOneBy({
      id: 1,
    });
    if (currentPageEntity) {
      currentPageEntity.currentPage = this.currentPage;
      await this.currentPageRepository.save(currentPageEntity);
    } else {
      const newCurrentPage = this.currentPageRepository.create({
        currentPage: this.currentPage,
      });
      await this.currentPageRepository.save(newCurrentPage);
    }
  }

  private async crawlMovie(): Promise<void> {
    try {
      const dramaListResponse = await axios.get(
        `https://api.themoviedb.org/3/discover/tv`,
        {
          params: {
            include_adult: false,
            include_null_first_air_dates: false,
            language: 'ko-KR',
            page: this.currentPage,
            sort_by: 'popularity.desc',
            with_genres: 18,
            with_origin_country: 'KR',
          },
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            accept: 'application/json',
          },
        },
      );

      const dramas = dramaListResponse.data.results;

      if (this.movieIndex < dramas.length) {
        const drama = dramas[this.movieIndex];

        const dramaDetails = await axios.get(
          `https://api.themoviedb.org/3/tv/${drama.id}`,
          {
            params: {
              language: 'en-US',
            },
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              accept: 'application/json',
            },
          },
        );

        const translations = await axios.get(
          `https://api.themoviedb.org/3/tv/${drama.id}/translations`,
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              accept: 'application/json',
            },
          },
        );

        const credits = await axios.get(
          `https://api.themoviedb.org/3/tv/${drama.id}/credits`,
          {
            params: {
              language: 'en-US',
            },
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              accept: 'application/json',
            },
          },
        );

        for (const person of [...credits.data.cast, ...credits.data.crew]) {
          await this.savePersonIfNotExist(person);
        }

        await this.saveDrama({
          ...dramaDetails.data,
          translations: translations.data,
        });

        this.logger.debug(`Crawled drama: ${drama.name}`);

        this.movieIndex++;
      } else {
        this.movieIndex = 0; // Reset the movie index for the next page
        this.currentPage++; // Increment to the next page
        this.logger.debug(`Moving to page ${this.currentPage}`);

        if (dramas.length === 0) {
          this.logger.debug(`No dramas found on page ${this.currentPage}`);
          return;
        }
      }

      await this.saveCurrentPage();
    } catch (error) {
      this.logger.error('Error during movie crawling', error);
    }
  }

  private async savePersonIfNotExist(person: any): Promise<void> {
    this.logger.debug(`Saving person: ${person.name}`);

    try {
      const existingPerson = await this.personRepository.findOne({
        where: { tmdbId: person.id },
      });

      if (existingPerson) {
        return;
      }

      const newPerson = this.personRepository.create({
        tmdbId: person.id,
        name: person.name,
        biography: person.biography || '',
        birthday: person.birthday || null,
        deathday: person.deathday || null,
        gender: person.gender || null,
        knownForDepartment: person.known_for_department || null,
        placeOfBirth: person.place_of_birth || null,
        alsoKnownAs: person.also_known_as || [],
      });

      // Save the new person to the database and log it
      await this.personRepository.save(newPerson);
      this.logger.debug(`Person ${person.name} saved successfully.`);
    } catch (error) {
      this.logger.error(
        `Error while saving person ${person.name}:`,
        error.stack,
      );

      // Check if the error is specifically a duplicate key issue and handle accordingly
      if (error?.code === '23505') {
        // This is a PostgreSQL code for unique constraint violation
        this.logger.warn(
          `Duplicate entry for person ${person.name}. Skipping insert.`,
        );
      }
    }
  }

  private async saveDrama(drama: any): Promise<void> {
    try {
      const existingDrama = await this.dramaService.findByTmdbId(drama.id);

      if (existingDrama) {
        this.logger.debug(`Drama ${drama.name} already exists`);
        return;
      }
    } catch (error) {
      if (error.message === 'Drama not found by TMDB ID') {
      } else {
        this.logger.error(`Error finding drama: ${drama.name}`, error.stack);
        throw error;
      }
    }

    try {
      const dramaDetailsResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/${drama.id}`,
        {
          params: {
            language: 'en-US',
          },
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            accept: 'application/json',
          },
        },
      );

      const dramaDetails = dramaDetailsResponse.data;
      const dramaData = {
        tmdbId: drama.id,
        title: drama.name,
        titleTranslations: {
          en: dramaDetails.name,
          ko: dramaDetails.name,
          vi: dramaDetails.name,
        },
        overview: dramaDetails.overview,
        overviewTranslations: {
          en: dramaDetails.overview,
          ko: dramaDetails.overview,
          vi: dramaDetails.overview,
        },
        releaseDate: dramaDetails.first_air_date || null,
        adult: dramaDetails.adult,
        backdropPath: dramaDetails.backdrop_path,
        firstAirDate: dramaDetails.first_air_date,
        inProduction: dramaDetails.in_production,
        lastAirDate: dramaDetails.last_air_date,
        popularity: dramaDetails.popularity,
        posterPath: dramaDetails.poster_path,
        status: dramaDetails.status,
        tagline: dramaDetails.tagline,
        voteAverage: dramaDetails.vote_average,
        voteCount: dramaDetails.vote_count,
      };

      const translationsResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/${drama.id}/translations`,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            accept: 'application/json',
          },
        },
      );

      const translations = translationsResponse.data.translations || [];
      translations.forEach((translation: any) => {
        const { iso_639_1, data } = translation;
        if (iso_639_1 === 'en' || iso_639_1 === 'ko' || iso_639_1 === 'vi') {
          dramaData.titleTranslations[iso_639_1] =
            data.title || dramaData.titleTranslations[iso_639_1];
          dramaData.overviewTranslations[iso_639_1] =
            data.overview || dramaData.overviewTranslations[iso_639_1];
        }
      });

      await this.dramaService.create(dramaData);
      this.logger.debug(`Drama ${drama.name} saved successfully.`);
    } catch (error) {
      this.logger.error(
        `Error fetching details for drama ${drama.name}`,
        error,
      );
    }
  }
}
