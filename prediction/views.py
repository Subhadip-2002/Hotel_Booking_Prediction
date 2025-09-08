# prediction/views.py
import os
import pickle
import traceback

import pandas as pd
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# ---------------------------
# Model loading (same as before)
# ---------------------------
MODEL_PATH = os.path.join(settings.BASE_DIR, 'prediction', 'models', 'random_forest_model.pkl')

try:
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
except FileNotFoundError:
    model = None

# ---------------------------
# Mean encoding dictionary (use your existing MEAN_ENCODING)
# NOTE: If you already have this large dict in a separate file, import it instead.
# For brevity I include the same structure you had (trimmed / unchanged logic).
# ---------------------------
MEAN_ENCODING = {
    "hotel": {
        "Resort Hotel": 0.2808151219884499,
        "City Hotel": 0.42232666846451183
    },
    "arrival_date_month": {
        "July": 0.3783414947419122,
        "August": 0.3813354786806114,
        "September": 0.3951441284581157,
        "October": 0.3855035279025016,
        "November": 0.31754412430230805,
        "December": 0.35903319565549946,
        "January": 0.30975441023867173,
        "February": 0.33793190735349954,
        "March": 0.32494802494802494,
        "April": 0.41130729119019305,
        "May": 0.40122498274672186,
        "June": 0.4183248496066636
    },
    "meal": {
        "BB": 0.3782190676983873,
        "FB": 0.6099744245524297,
        "HB": 0.34822555758170853,
        "SC": 0.37785673132321873,
        "Undefined": 0.251105216622458
    },
    "country": {
        "GBR": 0.20337293345517987,
        "PRT": 0.5814196020006385,
        "USA": 0.23880597014925373,
        "ESP": 0.2563134293131933,
        "IRL": 0.24665676077265974,
        "FRA": 0.18645379777455248,
        "unknown": 0.12205567451820129,
        "ROU": 0.2655935613682093,
        "NOR": 0.2975206611570248,
        "OMN": 0.37485705507857975,
        "ARG": 0.24528301886792453,
        "POL": 0.23289183222958057,
        "DEU": 0.1680033185840708,
        "BEL": 0.20232959447799828,
        "CHE": 0.24941588785046728,
        "CN": 0.1992156862745098,
        "GRC": 0.2734375,
        "ITA": 0.3548128342245989,
        "NLD": 0.18277511961722487,
        "DNK": 0.24475524475524477,
        "RUS": 0.38126009693053314,
        "SWE": 0.22211253701875616,
        "AUS": 0.2511737089201878,
        "EST": 0.21686746987951808,
        "CZE": 0.21764705882352942,
        "BRA": 0.3740909090909091,
        "FIN": 0.15384615384615385,
        "MOZ": 0.2878787878787879,
        "BWA": 0.37485705507859834,
        "LUX": 0.38380281690140844,
        "SVN": 0.2727272727272727,
        "ALB": 0.37485705507859834,
        "IND": 0.22666666666666666,
        "CHN": 0.46285140562248994,
        "MEX": 0.10843373493975904,
        "MAR": 0.42292490118577075,
        "UKR": 0.29850746268656714,
        "SMR": 0.37485705507859834,
        "LVA": 0.16363636363636364,
        "PRI": 0.37485705507859834,
        "SRB": 0.03,
        "CHL": 0.25,
        "AUT": 0.18116520351157223,
        "BLR": 0.3333333333333333,
        "LTU": 0.08641975308641975,
        "TUR": 0.4089068825910931,
        "ZAF": 0.3924050632911392,
        "ISR": 0.25263157894736843,
        "CYM": 0.37485705507859834,
        "ZMB": 0.37485705507859834,
        "CPV": 0.5,
        "ZWE": 0.37485705507859834,
        "DZA": 0.20388349514563106,
        "KOR": 0.4166666666666667,
        "CRI": 0.37484242672874035,
        "HUN": 0.33185840707964603,
        "ARE": 0.8571428571428571,
        "TUN": 0.5,
        "JAM": 0.37485705507859834,
        "HRV": 0.25,
        "HKG": 0.896551724137931,
        "IRN": 0.2804878048780488,
        "GEO": 0.6818181811854876,
        "AND": 0.37485705507859834,
        "GIB": 0.37485705556555426,
        "URY": 0.28125,
        "JEY": 0.37485705507859834,
        "CAF": 0.37485705507859834,
        "CYP": 0.22,
        "COL": 0.323943661971831,
        "GGY": 0.37485705507859834,
        "KWT": 0.37485705507859834,
        "NGA": 0.6176470588235294,
        "MDV": 0.37485705507859834,
        "VEN": 0.46153846153846156,
        "SVK": 0.36923076923076925,
        "AGO": 0.5774647887323944,
        "FJI": 0.37485705507859834,
        "KAZ": 0.374851984174783,
        "PAK": 0.37485705507859834,
        "IDN": 0.6857142857142857,
        "LBN": 0.2903225806451613,
        "PHL": 0.625,
        "SEN": 0.37485705507859834,
        "SYC": 0.37485705507859834,
        "AZE": 0.3748570550786128,
        "BHR": 0.37485705507859834,
        "NZL": 0.08108108108108109,
        "THA": 0.3103448275862069,
        "DOM": 0.37485705507859834,
        "MKD": 0.37485705507859834,
        "MYS": 0.10714285714285714,
        "ARM": 0.37485705507859834,
        "JPN": 0.14213197969543148,
        "LKA": 0.37485705507859834,
        "CUB": 0.37485705507859834,
        "CMR": 0.37485705507859834,
        "BIH": 0.37485705507859834,
        "MUS": 0.37485705507859834,
        "COM": 0.37485705507859834,
        "SUR": 0.37485705507859834,
        "UGA": 0.37485705507859834,
        "BGR": 0.16,
        "CIV": 0.37485705507859834,
        "JOR": 0.2624285275392992,
        "SYR": 0.37485705507859834,
        "SGP": 0.42105263157894735,
        "BDI": 0.37485705507859834,
        "SAU": 0.6808510638297872,
        "VNM": 0.37485705507859834,
        "PLW": 0.37485705507859834,
        "EGY": 0.3225806451612903,
        "PER": 0.20689655172413793,
        "MLT": 0.37485705487850307,
        "MWI": 0.37485705507859834,
        "ECU": 0.2962962962962963,
        "MDG": 0.37485705507859834,
        "ISL": 0.07142857142857142,
        "UZB": 0.37485705507859834,
        "NPL": 0.37485705507859834,
        "BHS": 0.37485705507859834,
        "MAC": 0.37485705507859834,
        "TGO": 0.37485705507859834,
        "TWN": 0.27450980392156865,
        "DJI": 0.37485705507859834,
        "STP": 0.37485705507859834,
        "KNA": 0.37485705507859834,
        "ETH": 0.37485705507859834,
        "IRQ": 0.37485705507859834,
        "HND": 0.37485705507859834,
        "RWA": 0.37485705507859834,
        "QAT": 0.37485705507859834,
        "KHM": 0.37485705507859834,
        "MCO": 0.37485705507859834,
        "BGD": 0.37485705507859834,
        "IMN": 0.37485705507859834,
        "TJK": 0.37485705507859834,
        "NIC": 0.37485705507859834,
        "BEN": 0.37485705507859834,
        "VGB": 0.37485705507859834,
        "TZA": 0.37485705507859834,
        "GAB": 0.37485705507859834,
        "GHA": 0.37485705507859834,
        "TMP": 0.37485705507859834,
        "GLP": 0.37485705507859834,
        "KEN": 0.37485705507859834,
        "LIE": 0.37485705507859834,
        "GNB": 0.37485705507859834,
        "MNE": 0.37485705507859834,
        "UMI": 0.37485705507859834,
        "MYT": 0.37485705507859834,
        "FRO": 0.37485705507859834,
        "MMR": 0.37485705507859834,
        "PAN": 0.37485705507859834,
        "BFA": 0.37485705507859834,
        "LBY": 0.37485705507859834,
        "MLI": 0.37485705507859834,
        "NAM": 0.37485705507859834,
        "BOL": 0.37485705507859834,
        "PRY": 0.37485705507859834,
        "BRB": 0.37485705507859834,
        "ABW": 0.37485705507859834,
        "AIA": 0.37485705507859834,
        "SLV": 0.37485705507859834,
        "DMA": 0.37485705507859834,
        "PYF": 0.37485705507859834,
        "GUY": 0.37485705507859834,
        "LCA": 0.37485705507859834,
        "ATA": 0.37485705507859834,
        "GTM": 0.37485705507859834,
        "ASM": 0.37485705507859834,
        "MRT": 0.37485705507859834,
        "NCL": 0.37485705507859834,
        "KIR": 0.37485705507859834,
        "SDN": 0.37485705507859834,
        "ATF": 0.37485705507859834,
        "SLE": 0.37485705507859834,
        "LAO": 0.37485705507859834
    },
    "market_segment": {
        "Direct": 0.15365280142706558,
        "Corporate": 0.1894070236039148,
        "Online TA": 0.369289113090766,
        "Offline TA/TO": 0.34628590570303996,
        "Groups": 0.6173237204070154,
        "Complementary": 0.08064516129032258,
        "Aviation": 0.22077922077922077
    },
    "distribution_channel": {
        "Direct": 0.17747193045997828,
        "Corporate": 0.2233533857781891,
        "TA/TO": 0.41354705274043435,
        "Undefined": 0.37485705507859834,
        "GDS": 0.19576719576719576
    },
    "reserved_room_type": {
        "A": 0.3959548169613815,
        "C": 0.33515881708652795,
        "D": 0.3203495104747868,
        "E": 0.2961981925833593,
        "G": 0.37686939182452645,
        "F": 0.30935506732813606,
        "H": 0.4117647058823529,
        "L": 0.37485705507859834,
        "B": 0.32
    },
    "assigned_room_type": {
        "C": 0.1895958727429063,
        "A": 0.44846530188318257,
        "D": 0.25368058889422307,
        "E": 0.253935215298556,
        "G": 0.3151243375458622,
        "F": 0.25041140976412507,
        "I": 0.024691358024691357,
        "B": 0.22135007849293564,
        "H": 0.3585714285714286,
        "L": 0.37485705507859834,
        "K": 0.08196721311475409
    },
    "deposit_type": {
        "No Deposit": 0.2869792734479493,
        "Refundable": 0.2222222222222222,
        "Non Refund": 0.9936244601357374
    },
    "customer_type": {
        "Transient": 0.4124725855388007,
        "Contract": 0.3112811651444088,
        "Transient-Party": 0.25724048161405794,
        "Group": 0.07749077490774908
    }
}
# ---------------------------
# End of MEAN_ENCODING
# ---------------------------


# ---------------------------
# API view
# ---------------------------
class PredictBookingView(APIView):
    # Disable session authentication (and hence CSRF) for this view:
    authentication_classes = []  # no SessionAuthentication -> avoids CSRF requirement
    permission_classes = []      # allow open access during development

    def post(self, request):
        if model is None:
            return Response({'error': 'Model not found on server'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        data = request.data or {}

        try:
            # Accept either naming conventions from frontend:
            previous_cancellations = int(
                data.get('previous_cancellations') or data.get('cancelled_bookings') or 0
            )
            previous_bookings_not_canceled = int(
                data.get('previous_bookings_not_canceled') or data.get('previous_bookings') or 0
            )

            booking_ratio = previous_cancellations / (
                previous_cancellations + previous_bookings_not_canceled + 1e-6
            )

            # Agent handling: if mean-encoding for 'agent' exists, use it; else accept numeric agent.
            if 'agent' in MEAN_ENCODING:
                agent_enc_map = MEAN_ENCODING.get('agent', {})
                agent_val = agent_enc_map.get(str(data.get('agent')), 0.0)
            else:
                # frontend sends numeric agent id; fallback to numeric value
                try:
                    agent_val = float(data.get('agent') or 0.0)
                except Exception:
                    agent_val = 0.0

            # Build sample data using mean encodings where available (fallback to 0.0)
            sample_data = {
                'deposit_type': [MEAN_ENCODING.get('deposit_type', {}).get(data.get('deposit_type'), 0.0)],
                'country': [MEAN_ENCODING.get('country', {}).get(data.get('country'), 0.0)],
                'lead_time': [float(data.get('lead_time') or 0.0)],
                'agent': [agent_val],
                'adr': [float(data.get('adr') or 0.0)],
                'arrival_date_day_of_month': [int(data.get('arrival_date_day_of_month') or 1)],
                'total_of_special_requests': [int(data.get('total_of_special_requests') or 0)],
                'arrival_date_week_number': [int(data.get('arrival_date_week_number') or 1)],
                'total_stay': [int(data.get('total_stay') or 1)],
                'booking_ratio': [booking_ratio],
                'arrival_date_month': [MEAN_ENCODING.get('arrival_date_month', {}).get(data.get('arrival_date_month'), 0.0)],
                'market_segment': [MEAN_ENCODING.get('market_segment', {}).get(data.get('market_segment'), 0.0)],
                'customer_type': [MEAN_ENCODING.get('customer_type', {}).get(data.get('customer_type'), 0.0)],
                'assigned_room_type': [MEAN_ENCODING.get('assigned_room_type', {}).get(data.get('assigned_room_type'), 0.0)],
                'required_car_parking_spaces': [int(data.get('required_car_parking_spaces') or 0)],
                'meal': [MEAN_ENCODING.get('meal', {}).get(data.get('meal'), 0.0)],
                'booking_changes': [int(data.get('booking_changes') or 0)],
                'distribution_channel': [MEAN_ENCODING.get('distribution_channel', {}).get(data.get('distribution_channel'), 0.0)],
                'reserved_room_type': [MEAN_ENCODING.get('reserved_room_type', {}).get(data.get('reserved_room_type'), 0.0)],
                'total_guests': [float(data.get('total_guests') or 1.0)]
            }

            sample_df = pd.DataFrame(sample_data)

            # Make prediction
            prediction = model.predict(sample_df)[0]
            prediction_proba = model.predict_proba(sample_df)[0]  # array like [prob_not_canceled, prob_canceled]

            result = {
                'prediction': int(prediction),
                'probability_not_canceled': round(float(prediction_proba[0]), 4),
                'probability_canceled': round(float(prediction_proba[1]), 4)
            }

            return Response(result)

        except Exception as e:
            # helpful for debugging in dev server logs
            traceback.print_exc()
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        return Response({'detail': 'POST JSON to this endpoint to get predictions.'})
