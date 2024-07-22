from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io
import preprocess
from random import randint as r

app = Flask(__name__)
CORS(app)

model = load_model('../model/model.hdf5')

label_to_class={
    0:"Mild Demented",
    1:"Moderate Demented",
    2:"Non Demented",
    3:"Very Mild Demented"
}

@app.route('/predict', methods=['POST'])
def predict():

    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        image = file.read()
        
        processed_image = preprocess.preprocess_image2(image)
        prediction = model.predict(processed_image)
        
        predicted_class = np.argmax(prediction, axis=1)[0]
        prediction_percentage = prediction[0][predicted_class] * 100
        # pred=r(0,3)
        return jsonify({
            "prediction": label_to_class[int(predicted_class)],
            "prediction_percentage": f"{prediction_percentage:.2f}%"
            })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)