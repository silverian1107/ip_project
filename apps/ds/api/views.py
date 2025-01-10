import os
import joblib
import json
import logging
import pandas as pd
import numpy as np
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

MODEL_PATH = "trained_model.pkl"
VECTORIZER_PATH = "tfidf_vectorizer.pkl"
ENCODER_PATH = "label_encoder.pkl"
CSV_PATH = os.path.join(settings.BASE_DIR, "drama.csv")

if (
    not os.path.exists(MODEL_PATH)
    or not os.path.exists(VECTORIZER_PATH)
    or not os.path.exists(ENCODER_PATH)
):
    logging.info("Không tìm thấy model hoặc vectorizer, bắt đầu huấn luyện lại...")

    # Đọc dữ liệu từ CSV
    df = pd.read_csv(CSV_PATH)
    df = df[["overview", "popularity", "voteAverage", "voteCount", "title"]].dropna()

    # Tạo label encoder và mã hóa nhãn
    label_encoder = LabelEncoder()
    df["title_encoded"] = label_encoder.fit_transform(df["title"])

    # Khởi tạo TF-IDF vectorizer
    vectorizer = TfidfVectorizer(max_features=5000)
    overview_vector = vectorizer.fit_transform(df["overview"]).toarray()

    # Kết hợp các đặc trưng số với vector overview
    numeric_features = df[["popularity", "voteAverage", "voteCount"]].values
    features = np.concatenate([overview_vector, numeric_features], axis=1)
    labels = df["title_encoded"]

    # Chia tập dữ liệu và huấn luyện mô hình
    X_train, X_test, y_train, y_test = train_test_split(
        features, labels, test_size=0.2, random_state=42
    )
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Lưu mô hình, vectorizer và label encoder
    joblib.dump(model, MODEL_PATH)
    joblib.dump(vectorizer, VECTORIZER_PATH)
    joblib.dump(label_encoder, ENCODER_PATH)

    logging.info("Huấn luyện và lưu trữ thành công!")
else:
    # Tải lại mô hình, vectorizer và label encoder đã lưu
    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
    label_encoder = joblib.load(ENCODER_PATH)
    logging.info("Đã tải model, vectorizer và label encoder từ file.")


@api_view(["POST"])
def get_top_dramas(request):
    """
    API nhận mảng phim và trả về 10 phim hay nhất.
    """
    try:
        # Log thông tin request
        logging.info("Received request: %s", request.data)

        # Parse dữ liệu từ request
        data = request.data
        dramas = data.get("dramas", [])

        if not dramas:
            return Response(
                {"error": "Dữ liệu không hợp lệ. Cần mảng phim."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Tạo danh sách chứa các phim dự đoán
        predictions = []

        for drama in dramas:
            overview = drama.get("overview", "")
            popularity = float(drama.get("popularity", 0))
            vote_average = float(drama.get("voteAverage", 0))
            vote_count = int(drama.get("voteCount", 0))

            # Kiểm tra dữ liệu đầu vào của mỗi phim
            if not overview or popularity < 0 or vote_average < 0 or vote_count < 0:
                continue  # Bỏ qua phim có dữ liệu không hợp lệ

            # Biến đổi overview thành vector bằng TF-IDF
            overview_vector = vectorizer.transform([overview]).toarray()

            # Tạo đặc trưng đầu vào cho mô hình
            numeric_features = np.array([[popularity, vote_average, vote_count]])
            features = np.concatenate([overview_vector, numeric_features], axis=1)

            # Dự đoán nhãn và giải mã thành tên phim
            predicted_label = model.predict(features)
            predicted_title = label_encoder.inverse_transform(predicted_label)

            # Thêm dự đoán vào danh sách
            predictions.append(
                {
                    "title": predicted_title[0],
                    "popularity": popularity,
                    "voteAverage": vote_average,
                    "voteCount": vote_count,
                }
            )

        # Sắp xếp phim theo độ phổ biến và điểm đánh giá, lấy 10 phim hay nhất
        top_dramas = sorted(
            predictions, key=lambda x: (x["popularity"], x["voteAverage"]), reverse=True
        )[:10]

        # Trả về kết quả
        return Response({"top_dramas": top_dramas})

    except json.JSONDecodeError:
        return Response(
            {"error": "Invalid JSON format"}, status=status.HTTP_400_BAD_REQUEST
        )
    except ValueError as e:
        return Response(
            {"error": f"Value error: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        logging.error("Internal server error: %s", str(e))
        return Response(
            {"error": f"Internal server error: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
