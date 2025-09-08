import pickle
import os
from django.conf import settings

model_path = os.path.join(settings.BASE_DIR, 'prediction', 'models', 'random_forest_model.pkl')

with open(model_path, 'rb') as f:
    loaded_model = pickle.load(f)

def get_model():
    return loaded_model
