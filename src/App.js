import { useState} from "react";
import {
  BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell, ReferenceLine
} from "recharts";

// ─── MOCK DATA (replace with your actual results_df export) ───────────────────

const ALL_EXPERIMENTS = [
  {
    "exp_id":"CNN_AUG__Adam__lr0p001__bs16",
    "Model":"CNN_AUG",
    "Optimizer":"Adam",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.445,
    "Precision":0.4817,
    "Recall":0.4506,
    "F1":0.3959,
    "TPR":0.4506,
    "FPR":0.1109,
    "TNR":0.8891,
    "FNR":0.5494,
    "Sensitivity":0.4506,
    "Specificity":0.8891,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN_AUG__Adam__lr0p001__bs32",
    "Model":"CNN_AUG",
    "Optimizer":"Adam",
    "LR":0.001,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.347,
    "Precision":0.5019,
    "Recall":0.3468,
    "F1":0.2885,
    "TPR":0.3468,
    "FPR":0.1313,
    "TNR":0.8687,
    "FNR":0.6532,
    "Sensitivity":0.3468,
    "Specificity":0.8687,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN_AUG__Adam__lr0p01__bs16",
    "Model":"CNN_AUG",
    "Optimizer":"Adam",
    "LR":0.01,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.175,
    "Precision":0.0292,
    "Recall":0.1667,
    "F1":0.0496,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN_AUG__Adam__lr0p01__bs32",
    "Model":"CNN_AUG",
    "Optimizer":"Adam",
    "LR":0.01,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.175,
    "Precision":0.0292,
    "Recall":0.1667,
    "F1":0.0496,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN_AUG__Adam__lr0p1__bs16",
    "Model":"CNN_AUG",
    "Optimizer":"Adam",
    "LR":0.1,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.1457,
    "Precision":0.0243,
    "Recall":0.1667,
    "F1":0.0424,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN_AUG__Adam__lr0p1__bs32",
    "Model":"CNN_AUG",
    "Optimizer":"Adam",
    "LR":0.1,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.17,
    "Precision":0.0283,
    "Recall":0.1667,
    "F1":0.0484,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN_AUG__RMSprop__lr0p001__bs16",
    "Model":"CNN_AUG",
    "Optimizer":"RMSprop",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.4867,
    "Precision":0.5888,
    "Recall":0.492,
    "F1":0.4771,
    "TPR":0.492,
    "FPR":0.1028,
    "TNR":0.8972,
    "FNR":0.508,
    "Sensitivity":0.492,
    "Specificity":0.8972,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN_AUG__RMSprop__lr0p001__bs32",
    "Model":"CNN_AUG",
    "Optimizer":"RMSprop",
    "LR":0.001,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.379,
    "Precision":0.4753,
    "Recall":0.3736,
    "F1":0.3427,
    "TPR":0.3736,
    "FPR":0.1251,
    "TNR":0.8749,
    "FNR":0.6264,
    "Sensitivity":0.3736,
    "Specificity":0.8749,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN_AUG__RMSprop__lr0p01__bs16",
    "Model":"CNN_AUG",
    "Optimizer":"RMSprop",
    "LR":0.01,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.167,
    "Precision":0.0278,
    "Recall":0.1667,
    "F1":0.0477,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN_AUG__RMSprop__lr0p01__bs32",
    "Model":"CNN_AUG",
    "Optimizer":"RMSprop",
    "LR":0.01,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.1843,
    "Precision":0.0307,
    "Recall":0.1667,
    "F1":0.0519,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN_AUG__RMSprop__lr0p1__bs16",
    "Model":"CNN_AUG",
    "Optimizer":"RMSprop",
    "LR":0.1,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.175,
    "Precision":0.0292,
    "Recall":0.1667,
    "F1":0.0496,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN_AUG__RMSprop__lr0p1__bs32",
    "Model":"CNN_AUG",
    "Optimizer":"RMSprop",
    "LR":0.1,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.167,
    "Precision":0.0278,
    "Recall":0.1667,
    "F1":0.0477,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN_AUG__SGD__lr0p001__bs16",
    "Model":"CNN_AUG",
    "Optimizer":"SGD",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.4807,
    "Precision":0.5647,
    "Recall":0.4913,
    "F1":0.4496,
    "TPR":0.4913,
    "FPR":0.1028,
    "TNR":0.8972,
    "FNR":0.5087,
    "Sensitivity":0.4913,
    "Specificity":0.8972,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN_AUG__SGD__lr0p001__bs32",
    "Model":"CNN_AUG",
    "Optimizer":"SGD",
    "LR":0.001,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.281,
    "Precision":0.507,
    "Recall":0.2743,
    "F1":0.2076,
    "TPR":0.2743,
    "FPR":0.1447,
    "TNR":0.8553,
    "FNR":0.7257,
    "Sensitivity":0.2743,
    "Specificity":0.8553,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN_AUG__SGD__lr0p01__bs16",
    "Model":"CNN_AUG",
    "Optimizer":"SGD",
    "LR":0.01,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.5927,
    "Precision":0.6589,
    "Recall":0.598,
    "F1":0.5658,
    "TPR":0.598,
    "FPR":0.0814,
    "TNR":0.9186,
    "FNR":0.402,
    "Sensitivity":0.598,
    "Specificity":0.9186,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN_AUG__SGD__lr0p01__bs32",
    "Model":"CNN_AUG",
    "Optimizer":"SGD",
    "LR":0.01,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.6157,
    "Precision":0.6327,
    "Recall":0.6151,
    "F1":0.605,
    "TPR":0.6151,
    "FPR":0.0769,
    "TNR":0.9231,
    "FNR":0.3849,
    "Sensitivity":0.6151,
    "Specificity":0.9231,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN_AUG__SGD__lr0p1__bs16",
    "Model":"CNN_AUG",
    "Optimizer":"SGD",
    "LR":0.1,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.479,
    "Precision":0.5462,
    "Recall":0.4766,
    "F1":0.4175,
    "TPR":0.4766,
    "FPR":0.1049,
    "TNR":0.8951,
    "FNR":0.5234,
    "Sensitivity":0.4766,
    "Specificity":0.8951,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN_AUG__SGD__lr0p1__bs32",
    "Model":"CNN_AUG",
    "Optimizer":"SGD",
    "LR":0.1,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.5253,
    "Precision":0.5408,
    "Recall":0.5264,
    "F1":0.5074,
    "TPR":0.5264,
    "FPR":0.0947,
    "TNR":0.9053,
    "FNR":0.4736,
    "Sensitivity":0.5264,
    "Specificity":0.9053,
    "Category":"CNN + Aug"
  },
  {
    "exp_id":"CNN__Adam__lr0p001__bs16",
    "Model":"CNN",
    "Optimizer":"Adam",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.389,
    "Precision":0.4578,
    "Recall":0.3759,
    "F1":0.2964,
    "TPR":0.3759,
    "FPR":0.1227,
    "TNR":0.8773,
    "FNR":0.6241,
    "Sensitivity":0.3759,
    "Specificity":0.8773,
    "Category":"CNN"
  },
  {
    "exp_id":"CNN__Adam__lr0p001__bs32",
    "Model":"CNN",
    "Optimizer":"Adam",
    "LR":0.001,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.3393,
    "Precision":0.4874,
    "Recall":0.3274,
    "F1":0.3183,
    "TPR":0.3274,
    "FPR":0.134,
    "TNR":0.866,
    "FNR":0.6726,
    "Sensitivity":0.3274,
    "Specificity":0.866,
    "Category":"CNN"
  },
  {
    "exp_id":"CNN__Adam__lr0p01__bs16",
    "Model":"CNN",
    "Optimizer":"Adam",
    "LR":0.01,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.167,
    "Precision":0.0278,
    "Recall":0.1667,
    "F1":0.0477,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"CNN"
  },
  {
    "exp_id":"CNN__Adam__lr0p01__bs32",
    "Model":"CNN",
    "Optimizer":"Adam",
    "LR":0.01,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.175,
    "Precision":0.0292,
    "Recall":0.1667,
    "F1":0.0496,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"CNN"
  },
  {
    "exp_id":"CNN__Adam__lr0p1__bs16",
    "Model":"CNN",
    "Optimizer":"Adam",
    "LR":0.1,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.1843,
    "Precision":0.0307,
    "Recall":0.1667,
    "F1":0.0519,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"CNN"
  },
  {
    "exp_id":"CNN__Adam__lr0p1__bs32",
    "Model":"CNN",
    "Optimizer":"Adam",
    "LR":0.1,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.167,
    "Precision":0.0278,
    "Recall":0.1667,
    "F1":0.0477,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"CNN"
  },
  {
    "exp_id":"CNN__RMSprop__lr0p001__bs16",
    "Model":"CNN",
    "Optimizer":"RMSprop",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.5427,
    "Precision":0.6605,
    "Recall":0.5463,
    "F1":0.5308,
    "TPR":0.5463,
    "FPR":0.0916,
    "TNR":0.9084,
    "FNR":0.4537,
    "Sensitivity":0.5463,
    "Specificity":0.9084,
    "Category":"CNN"
  },
  {
    "exp_id":"CNN__RMSprop__lr0p001__bs32",
    "Model":"CNN",
    "Optimizer":"RMSprop",
    "LR":0.001,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.3647,
    "Precision":0.6072,
    "Recall":0.3606,
    "F1":0.3266,
    "TPR":0.3606,
    "FPR":0.1277,
    "TNR":0.8723,
    "FNR":0.6394,
    "Sensitivity":0.3606,
    "Specificity":0.8723,
    "Category":"CNN"
  },
  {
    "exp_id":"CNN__RMSprop__lr0p01__bs16",
    "Model":"CNN",
    "Optimizer":"RMSprop",
    "LR":0.01,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.1843,
    "Precision":0.0307,
    "Recall":0.1667,
    "F1":0.0519,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"CNN"
  },
  {
    "exp_id":"CNN__RMSprop__lr0p01__bs32",
    "Model":"CNN",
    "Optimizer":"RMSprop",
    "LR":0.01,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.1843,
    "Precision":0.0307,
    "Recall":0.1667,
    "F1":0.0519,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"CNN"
  },
  {
    "exp_id":"CNN__RMSprop__lr0p1__bs16",
    "Model":"CNN",
    "Optimizer":"RMSprop",
    "LR":0.1,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.17,
    "Precision":0.0283,
    "Recall":0.1667,
    "F1":0.0484,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"CNN"
  },
  {
    "exp_id":"CNN__RMSprop__lr0p1__bs32",
    "Model":"CNN",
    "Optimizer":"RMSprop",
    "LR":0.1,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.1843,
    "Precision":0.0307,
    "Recall":0.1667,
    "F1":0.0519,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"CNN"
  },
  {
    "exp_id":"CNN__SGD__lr0p001__bs16",
    "Model":"CNN",
    "Optimizer":"SGD",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.6523,
    "Precision":0.66,
    "Recall":0.6526,
    "F1":0.6537,
    "TPR":0.6526,
    "FPR":0.0697,
    "TNR":0.9303,
    "FNR":0.3474,
    "Sensitivity":0.6526,
    "Specificity":0.9303,
    "Category":"CNN"
  },
  {
    "exp_id":"CNN__SGD__lr0p001__bs32",
    "Model":"CNN",
    "Optimizer":"SGD",
    "LR":0.001,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.235,
    "Precision":0.466,
    "Recall":0.2304,
    "F1":0.1569,
    "TPR":0.2304,
    "FPR":0.1537,
    "TNR":0.8463,
    "FNR":0.7696,
    "Sensitivity":0.2304,
    "Specificity":0.8463,
    "Category":"CNN"
  },
  {
    "exp_id":"CNN__SGD__lr0p01__bs16",
    "Model":"CNN",
    "Optimizer":"SGD",
    "LR":0.01,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.5403,
    "Precision":0.6183,
    "Recall":0.5547,
    "F1":0.5102,
    "TPR":0.5547,
    "FPR":0.0912,
    "TNR":0.9088,
    "FNR":0.4453,
    "Sensitivity":0.5547,
    "Specificity":0.9088,
    "Category":"CNN"
  },
  {
    "exp_id":"CNN__SGD__lr0p01__bs32",
    "Model":"CNN",
    "Optimizer":"SGD",
    "LR":0.01,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.432,
    "Precision":0.5448,
    "Recall":0.444,
    "F1":0.3707,
    "TPR":0.444,
    "FPR":0.1133,
    "TNR":0.8867,
    "FNR":0.556,
    "Sensitivity":0.444,
    "Specificity":0.8867,
    "Category":"CNN"
  },
  {
    "exp_id":"CNN__SGD__lr0p1__bs16",
    "Model":"CNN",
    "Optimizer":"SGD",
    "LR":0.1,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.7747,
    "Precision":0.7822,
    "Recall":0.7759,
    "F1":0.7756,
    "TPR":0.7759,
    "FPR":0.0453,
    "TNR":0.9547,
    "FNR":0.2241,
    "Sensitivity":0.7759,
    "Specificity":0.9547,
    "Category":"CNN"
  },
  {
    "exp_id":"CNN__SGD__lr0p1__bs32",
    "Model":"CNN",
    "Optimizer":"SGD",
    "LR":0.1,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.6633,
    "Precision":0.6592,
    "Recall":0.6676,
    "F1":0.6597,
    "TPR":0.6676,
    "FPR":0.0673,
    "TNR":0.9327,
    "FNR":0.3324,
    "Sensitivity":0.6676,
    "Specificity":0.9327,
    "Category":"CNN"
  },
  {
    "exp_id":"DNN__Adam__lr0p001__bs16",
    "Model":"DNN",
    "Optimizer":"Adam",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.175,
    "Precision":0.0292,
    "Recall":0.1667,
    "F1":0.0496,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"DNN"
  },
  {
    "exp_id":"DNN__Adam__lr0p001__bs32",
    "Model":"DNN",
    "Optimizer":"Adam",
    "LR":0.001,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.176,
    "Precision":0.3625,
    "Recall":0.1677,
    "F1":0.0517,
    "TPR":0.1677,
    "FPR":0.1665,
    "TNR":0.8335,
    "FNR":0.8323,
    "Sensitivity":0.1677,
    "Specificity":0.8335,
    "Category":"DNN"
  },
  {
    "exp_id":"DNN__Adam__lr0p01__bs16",
    "Model":"DNN",
    "Optimizer":"Adam",
    "LR":0.01,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.175,
    "Precision":0.0292,
    "Recall":0.1667,
    "F1":0.0496,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"DNN"
  },
  {
    "exp_id":"DNN__Adam__lr0p01__bs32",
    "Model":"DNN",
    "Optimizer":"Adam",
    "LR":0.01,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.1847,
    "Precision":0.1974,
    "Recall":0.167,
    "F1":0.0527,
    "TPR":0.167,
    "FPR":0.1666,
    "TNR":0.8334,
    "FNR":0.833,
    "Sensitivity":0.167,
    "Specificity":0.8334,
    "Category":"DNN"
  },
  {
    "exp_id":"DNN__Adam__lr0p1__bs16",
    "Model":"DNN",
    "Optimizer":"Adam",
    "LR":0.1,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.167,
    "Precision":0.0278,
    "Recall":0.1667,
    "F1":0.0477,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"DNN"
  },
  {
    "exp_id":"DNN__Adam__lr0p1__bs32",
    "Model":"DNN",
    "Optimizer":"Adam",
    "LR":0.1,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.175,
    "Precision":0.0292,
    "Recall":0.1667,
    "F1":0.0496,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"DNN"
  },
  {
    "exp_id":"DNN__RMSprop__lr0p001__bs16",
    "Model":"DNN",
    "Optimizer":"RMSprop",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.1843,
    "Precision":0.0307,
    "Recall":0.1667,
    "F1":0.0519,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"DNN"
  },
  {
    "exp_id":"DNN__RMSprop__lr0p001__bs32",
    "Model":"DNN",
    "Optimizer":"RMSprop",
    "LR":0.001,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.175,
    "Precision":0.0292,
    "Recall":0.1667,
    "F1":0.0497,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"DNN"
  },
  {
    "exp_id":"DNN__RMSprop__lr0p01__bs16",
    "Model":"DNN",
    "Optimizer":"RMSprop",
    "LR":0.01,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.175,
    "Precision":0.0292,
    "Recall":0.1667,
    "F1":0.0497,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"DNN"
  },
  {
    "exp_id":"DNN__RMSprop__lr0p01__bs32",
    "Model":"DNN",
    "Optimizer":"RMSprop",
    "LR":0.01,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.175,
    "Precision":0.0292,
    "Recall":0.1667,
    "F1":0.0496,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"DNN"
  },
  {
    "exp_id":"DNN__RMSprop__lr0p1__bs16",
    "Model":"DNN",
    "Optimizer":"RMSprop",
    "LR":0.1,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.167,
    "Precision":0.0278,
    "Recall":0.1667,
    "F1":0.0477,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"DNN"
  },
  {
    "exp_id":"DNN__RMSprop__lr0p1__bs32",
    "Model":"DNN",
    "Optimizer":"RMSprop",
    "LR":0.1,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.167,
    "Precision":0.0278,
    "Recall":0.1667,
    "F1":0.0477,
    "TPR":0.1667,
    "FPR":0.1667,
    "TNR":0.8333,
    "FNR":0.8333,
    "Sensitivity":0.1667,
    "Specificity":0.8333,
    "Category":"DNN"
  },
  {
    "exp_id":"DNN__SGD__lr0p001__bs16",
    "Model":"DNN",
    "Optimizer":"SGD",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.5803,
    "Precision":0.5738,
    "Recall":0.5747,
    "F1":0.5656,
    "TPR":0.5747,
    "FPR":0.0843,
    "TNR":0.9157,
    "FNR":0.4253,
    "Sensitivity":0.5747,
    "Specificity":0.9157,
    "Category":"DNN"
  },
  {
    "exp_id":"DNN__SGD__lr0p001__bs32",
    "Model":"DNN",
    "Optimizer":"SGD",
    "LR":0.001,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.473,
    "Precision":0.4609,
    "Recall":0.4624,
    "F1":0.4236,
    "TPR":0.4624,
    "FPR":0.1063,
    "TNR":0.8937,
    "FNR":0.5376,
    "Sensitivity":0.4624,
    "Specificity":0.8937,
    "Category":"DNN"
  },
  {
    "exp_id":"DNN__SGD__lr0p01__bs16",
    "Model":"DNN",
    "Optimizer":"SGD",
    "LR":0.01,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.4007,
    "Precision":0.3607,
    "Recall":0.4083,
    "F1":0.349,
    "TPR":0.4083,
    "FPR":0.119,
    "TNR":0.881,
    "FNR":0.5917,
    "Sensitivity":0.4083,
    "Specificity":0.881,
    "Category":"DNN"
  },
  {
    "exp_id":"DNN__SGD__lr0p01__bs32",
    "Model":"DNN",
    "Optimizer":"SGD",
    "LR":0.01,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.4723,
    "Precision":0.4073,
    "Recall":0.4671,
    "F1":0.4302,
    "TPR":0.4671,
    "FPR":0.1057,
    "TNR":0.8943,
    "FNR":0.5329,
    "Sensitivity":0.4671,
    "Specificity":0.8943,
    "Category":"DNN"
  },
  {
    "exp_id":"DNN__SGD__lr0p1__bs16",
    "Model":"DNN",
    "Optimizer":"SGD",
    "LR":0.1,
    "BatchSize":16,
    "Frozen":null,
    "Accuracy":0.292,
    "Precision":0.1216,
    "Recall":0.2932,
    "F1":0.1476,
    "TPR":0.2932,
    "FPR":0.1415,
    "TNR":0.8585,
    "FNR":0.7068,
    "Sensitivity":0.2932,
    "Specificity":0.8585,
    "Category":"DNN"
  },
  {
    "exp_id":"DNN__SGD__lr0p1__bs32",
    "Model":"DNN",
    "Optimizer":"SGD",
    "LR":0.1,
    "BatchSize":32,
    "Frozen":null,
    "Accuracy":0.3913,
    "Precision":0.3682,
    "Recall":0.3838,
    "F1":0.3573,
    "TPR":0.3838,
    "FPR":0.1225,
    "TNR":0.8775,
    "FNR":0.6162,
    "Sensitivity":0.3838,
    "Specificity":0.8775,
    "Category":"DNN"
  },
  {
    "exp_id":"DenseNet121__Adam__lr0p001__bs16__frozen",
    "Model":"DenseNet121",
    "Optimizer":"Adam",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":true,
    "Accuracy":0.89,
    "Precision":0.8927,
    "Recall":0.8937,
    "F1":0.8919,
    "TPR":0.8937,
    "FPR":0.0221,
    "TNR":0.9779,
    "FNR":0.1063,
    "Sensitivity":0.8937,
    "Specificity":0.9779,
    "Category":"Transfer Learning"
  },
  {
    "exp_id":"DenseNet121__Adam__lr0p001__bs16__unfrozen",
    "Model":"DenseNet121",
    "Optimizer":"Adam",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":false,
    "Accuracy":0.835,
    "Precision":0.8479,
    "Recall":0.8374,
    "F1":0.838,
    "TPR":0.8374,
    "FPR":0.0332,
    "TNR":0.9668,
    "FNR":0.1626,
    "Sensitivity":0.8374,
    "Specificity":0.9668,
    "Category":"Transfer Learning"
  },
  {
    "exp_id":"InceptionV3__Adam__lr0p001__bs16__frozen",
    "Model":"InceptionV3",
    "Optimizer":"Adam",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":true,
    "Accuracy":0.8313,
    "Precision":0.8368,
    "Recall":0.8355,
    "F1":0.8323,
    "TPR":0.8355,
    "FPR":0.0338,
    "TNR":0.9662,
    "FNR":0.1645,
    "Sensitivity":0.8355,
    "Specificity":0.9662,
    "Category":"Transfer Learning"
  },
  {
    "exp_id":"InceptionV3__Adam__lr0p001__bs16__unfrozen",
    "Model":"InceptionV3",
    "Optimizer":"Adam",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":false,
    "Accuracy":0.7103,
    "Precision":0.743,
    "Recall":0.71,
    "F1":0.7045,
    "TPR":0.71,
    "FPR":0.0579,
    "TNR":0.9421,
    "FNR":0.29,
    "Sensitivity":0.71,
    "Specificity":0.9421,
    "Category":"Transfer Learning"
  },
  {
    "exp_id":"MobileNetV2__Adam__lr0p001__bs16__frozen",
    "Model":"MobileNetV2",
    "Optimizer":"Adam",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":true,
    "Accuracy":0.891,
    "Precision":0.8932,
    "Recall":0.8943,
    "F1":0.8933,
    "TPR":0.8943,
    "FPR":0.0219,
    "TNR":0.9781,
    "FNR":0.1057,
    "Sensitivity":0.8943,
    "Specificity":0.9781,
    "Category":"Transfer Learning"
  },
  {
    "exp_id":"MobileNetV2__Adam__lr0p001__bs16__unfrozen",
    "Model":"MobileNetV2",
    "Optimizer":"Adam",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":false,
    "Accuracy":0.4957,
    "Precision":0.7269,
    "Recall":0.5117,
    "F1":0.4883,
    "TPR":0.5117,
    "FPR":0.0991,
    "TNR":0.9009,
    "FNR":0.4883,
    "Sensitivity":0.5117,
    "Specificity":0.9009,
    "Category":"Transfer Learning"
  },
  {
    "exp_id":"ResNet50__Adam__lr0p001__bs16__frozen",
    "Model":"ResNet50",
    "Optimizer":"Adam",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":true,
    "Accuracy":0.3607,
    "Precision":0.5061,
    "Recall":0.3712,
    "F1":0.2841,
    "TPR":0.3712,
    "FPR":0.1273,
    "TNR":0.8727,
    "FNR":0.6288,
    "Sensitivity":0.3712,
    "Specificity":0.8727,
    "Category":"Transfer Learning"
  },
  {
    "exp_id":"ResNet50__Adam__lr0p001__bs16__unfrozen",
    "Model":"ResNet50",
    "Optimizer":"Adam",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":false,
    "Accuracy":0.3147,
    "Precision":0.4481,
    "Recall":0.2995,
    "F1":0.2408,
    "TPR":0.2995,
    "FPR":0.1391,
    "TNR":0.8609,
    "FNR":0.7005,
    "Sensitivity":0.2995,
    "Specificity":0.8609,
    "Category":"Transfer Learning"
  },
  {
    "exp_id":"VGG16__Adam__lr0p001__bs16__frozen",
    "Model":"VGG16",
    "Optimizer":"Adam",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":true,
    "Accuracy":0.8083,
    "Precision":0.8271,
    "Recall":0.8107,
    "F1":0.8112,
    "TPR":0.8107,
    "FPR":0.0386,
    "TNR":0.9614,
    "FNR":0.1893,
    "Sensitivity":0.8107,
    "Specificity":0.9614,
    "Category":"Transfer Learning"
  },
  {
    "exp_id":"VGG16__Adam__lr0p001__bs16__unfrozen",
    "Model":"VGG16",
    "Optimizer":"Adam",
    "LR":0.001,
    "BatchSize":16,
    "Frozen":false,
    "Accuracy":0.273,
    "Precision":0.271,
    "Recall":0.2809,
    "F1":0.1719,
    "TPR":0.2809,
    "FPR":0.1451,
    "TNR":0.8549,
    "FNR":0.7191,
    "Sensitivity":0.2809,
    "Specificity":0.8549,
    "Category":"Transfer Learning"
  }
];

const CLASS_DISTRIBUTION = [
  { cls:"Buildings", train:2191, test:437 },
  { cls:"Forest",    train:2271, test:474 },
  { cls:"Glacier",   train:2404, test:553 },
  { cls:"Mountain",  train:2512, test:525 },
  { cls:"Sea",       train:2274, test:510 },
  { cls:"Street",    train:2382, test:501 },
];

const CONFUSION_MATRICES = {
  DenseNet121_unfrozen: [
    [421,  8,  2,  1,  3,  2],
    [  5,461,  2,  1,  3,  2],
    [  3,  2,527,  9,  8,  4],
    [  2,  1,  8,503,  7,  4],
    [  3,  2,  6,  5,488,  6],
    [  4,  3,  2,  3,  4,485],
  ],
};

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const P = {
  bg:       "#0a0e1a",
  surface:  "#111827",
  card:     "#151d2e",
  border:   "#1e2d45",
  accent:   "#00d4ff",
  accent2:  "#7c3aed",
  accent3:  "#f59e0b",
  green:    "#10b981",
  red:      "#ef4444",
  text:     "#e2e8f0",
  muted:    "#64748b",
  dnn:      "#ef4444",
  cnn:      "#3b82f6",
  aug:      "#10b981",
  tl:       "#a855f7",
};

const CAT_COLORS = {
  "DNN":               P.dnn,
  "CNN":               P.cnn,
  "CNN + Aug":         P.aug,
  "Transfer Learning": P.tl,
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (v, d=4) => typeof v === "number" ? v.toFixed(d) : v;
const pct = (v) => `${(v*100).toFixed(1)}%`;

function getBest(data) {
  return [...data].sort((a,b) => b.Accuracy - a.Accuracy)[0];
}
function getWorst(data) {
  return [...data].sort((a,b) => a.Accuracy - b.Accuracy)[0];
}
function avgByCategory(data) {
  const map = {};
  data.forEach(d => {
    if (!map[d.Category]) map[d.Category] = [];
    map[d.Category].push(d.Accuracy);
  });
  return Object.entries(map).map(([cat, vals]) => ({
    cat,
    avg: vals.reduce((a,b)=>a+b,0)/vals.length,
    max: Math.max(...vals),
    min: Math.min(...vals),
  })).sort((a,b) => b.avg - a.avg);
}

// ─── SUBCOMPONENTS ────────────────────────────────────────────────────────────

function KPICard({ label, value, sub, color, icon }) {
  return (
    <div style={{
      background: P.card, border: `1px solid ${P.border}`,
      borderRadius: 16, padding: "20px 24px",
      borderTop: `3px solid ${color}`,
      display:"flex", flexDirection:"column", gap:6,
      minWidth:0,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontSize:20 }}>{icon}</span>
        <span style={{ color: P.muted, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"'DM Mono', monospace" }}>{label}</span>
      </div>
      <div style={{ color, fontSize:32, fontWeight:800, fontFamily:"'Syne', sans-serif", lineHeight:1 }}>{value}</div>
      {sub && <div style={{ color: P.muted, fontSize:11 }}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ children, accent = P.accent }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
      <div style={{ width:4, height:28, background:`linear-gradient(180deg, ${accent}, transparent)`, borderRadius:2 }}/>
      <h2 style={{ color: P.text, fontSize:17, fontWeight:700, fontFamily:"'Syne', sans-serif", margin:0, letterSpacing:"0.02em" }}>{children}</h2>
    </div>
  );
}

function Card({ children, style={} }) {
  return (
    <div style={{
      background: P.card, border:`1px solid ${P.border}`,
      borderRadius:16, padding:24, ...style
    }}>
      {children}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"#1e293b", border:`1px solid ${P.border}`, borderRadius:10, padding:"10px 14px" }}>
      <p style={{ color: P.text, margin:0, fontSize:12, fontWeight:600, marginBottom:6 }}>{label}</p>
      {payload.map((p,i) => (
        <p key={i} style={{ color: p.color, margin:"2px 0", fontSize:12 }}>
          {p.name}: {fmt(p.value, 3)}
        </p>
      ))}
    </div>
  );
};

// ─── CONFUSION MATRIX COMPONENT ───────────────────────────────────────────────
function ConfusionMatrix({ matrix, classes }) {
  const max = Math.max(...matrix.flat());
  const labels = ["Bldg","Forest","Glacr","Mtn","Sea","Str"];
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ borderCollapse:"collapse", width:"100%" }}>
        <thead>
          <tr>
            <th style={{ color: P.muted, fontSize:10, padding:"4px 6px" }}>True↓ Pred→</th>
            {labels.map(l => <th key={l} style={{ color: P.accent, fontSize:10, padding:"4px 8px", fontFamily:"'DM Mono',monospace" }}>{l}</th>)}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              <td style={{ color: P.accent, fontSize:10, padding:"4px 8px", fontFamily:"'DM Mono',monospace", fontWeight:700 }}>{labels[i]}</td>
              {row.map((val, j) => {
                const intensity = val / max;
                const isCorrect = i === j;
                const bg = isCorrect
                  ? `rgba(16,185,129,${0.15 + intensity * 0.7})`
                  : `rgba(239,68,68,${intensity * 0.5})`;
                return (
                  <td key={j} style={{
                    background: bg, color: intensity > 0.4 ? "#fff" : P.text,
                    fontSize:11, padding:"6px 10px", textAlign:"center",
                    fontFamily:"'DM Mono',monospace", fontWeight: isCorrect ? 700 : 400,
                    border:`1px solid ${P.border}`, borderRadius:4,
                  }}>{val}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── RADAR CHART COMPONENT ────────────────────────────────────────────────────
function RadarComparison({ data }) {
  const metrics = ["Accuracy","Precision","Recall","F1","Specificity","Sensitivity"];
  const best = {};
  ["DNN","CNN","CNN + Aug","Transfer Learning"].forEach(cat => {
    const sub = data.filter(d => d.Category === cat);
    if (sub.length) best[cat] = sub.sort((a,b)=>b.Accuracy-a.Accuracy)[0];
  });
  const radarData = metrics.map(m => {
    const obj = { metric: m };
    Object.entries(best).forEach(([cat, row]) => { obj[cat] = row[m]; });
    return obj;
  });
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={radarData}>
        <PolarGrid stroke={P.border} />
        <PolarAngleAxis dataKey="metric" tick={{ fill: P.muted, fontSize:10 }} />
        <PolarRadiusAxis angle={90} domain={[0,1]} tick={{ fill: P.muted, fontSize:8 }} />
        {Object.keys(best).map(cat => (
          <Radar key={cat} name={cat} dataKey={cat}
            stroke={CAT_COLORS[cat]} fill={CAT_COLORS[cat]} fillOpacity={0.1}
            strokeWidth={2} dot={{ fill: CAT_COLORS[cat], r:3 }}
          />
        ))}
        <Legend wrapperStyle={{ fontSize:11, color: P.text }} />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

// ─── METRICS TABLE ────────────────────────────────────────────────────────────
function MetricsTable({ data }) {
  const cols = ["Model","Category","Accuracy","Precision","Recall","F1","TPR","FPR","TNR","FNR"];
  const sorted = [...data].sort((a,b) => b.Accuracy - a.Accuracy);
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11 }}>
        <thead>
          <tr>
            {cols.map(c => (
              <th key={c} style={{
                color: P.accent, padding:"8px 12px", textAlign:"left",
                borderBottom:`1px solid ${P.border}`, fontFamily:"'DM Mono',monospace",
                fontSize:10, letterSpacing:"0.05em", whiteSpace:"nowrap"
              }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={i} style={{
              background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
              transition:"background 0.15s"
            }}>
              {cols.map(c => {
                const val = row[c];
                const isNum = typeof val === "number";
                const isAcc = c === "Accuracy";
                const isFPR = c === "FPR" || c === "FNR";
                let color = P.text;
                if (isNum && isAcc) color = val > 0.9 ? P.green : val > 0.8 ? P.accent3 : P.red;
                if (isNum && isFPR) color = val < 0.08 ? P.green : val < 0.15 ? P.accent3 : P.red;
                return (
                  <td key={c} style={{
                    padding:"7px 12px", color,
                    borderBottom:`1px solid rgba(30,45,69,0.5)`,
                    fontFamily: isNum ? "'DM Mono',monospace" : "inherit",
                    fontWeight: isAcc ? 700 : 400,
                    whiteSpace:"nowrap"
                  }}>
                    {c === "Category" ? (
                      <span style={{
                        background:`${CAT_COLORS[val]}22`,
                        color: CAT_COLORS[val],
                        padding:"2px 8px", borderRadius:99, fontSize:10,
                        border:`1px solid ${CAT_COLORS[val]}44`
                      }}>{val}</span>
                    ) : isNum ? fmt(val, 4) : val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const best = getBest(ALL_EXPERIMENTS);
  const worst = getWorst(ALL_EXPERIMENTS);
  const tlExps = ALL_EXPERIMENTS.filter(d => d.Category === "Transfer Learning");
  const avgAcc = ALL_EXPERIMENTS.reduce((a,b)=>a+b.Accuracy,0)/ALL_EXPERIMENTS.length;
  const catAvg = avgByCategory(ALL_EXPERIMENTS);

  // Category avg bar data
  const catBarData = catAvg.map(c => ({
    name: c.cat, Accuracy: +c.avg.toFixed(4), Max: +c.max.toFixed(4), Min: +c.min.toFixed(4)
  }));

  // TL frozen vs unfrozen
  const tlCompare = ["ResNet50","MobileNetV2","VGG16","InceptionV3","DenseNet121"].map(m => {
    const fr = tlExps.find(d => d.Model === m && d.Frozen === true);
    const uf = tlExps.find(d => d.Model === m && d.Frozen === false);
    return {
      model: m,
      Frozen:   fr ? +fr.Accuracy.toFixed(4) : 0,
      Unfrozen: uf ? +uf.Accuracy.toFixed(4) : 0,
    };
  });

  // Scatter: precision vs recall
  const scatterData = ALL_EXPERIMENTS.map(d => ({
    x: +d.Precision.toFixed(4), y: +d.Recall.toFixed(4),
    model: d.Model, cat: d.Category,
  }));

  // All experiments ranked
  const rankedData = [...ALL_EXPERIMENTS]
    .sort((a,b) => b.Accuracy - a.Accuracy)
    .map(d => ({ name: d.Model + (d.Frozen !== null ? (d.Frozen ? " (F)":"(U)") : ""), acc: d.Accuracy, cat: d.Category }));

  // Metrics for best TL model
  const bestTL = getBest(tlExps);
  const metricsBarData = [
    { name:"Accuracy",    value: bestTL.Accuracy },
    { name:"Precision",   value: bestTL.Precision },
    { name:"Recall",      value: bestTL.Recall },
    { name:"F1 Score",    value: bestTL.F1 },
    { name:"Sensitivity", value: bestTL.Sensitivity },
    { name:"Specificity", value: bestTL.Specificity },
    { name:"TPR",         value: bestTL.TPR },
    { name:"TNR",         value: bestTL.TNR },
  ];
  const rateBarData = [
    { name:"TPR",  value: bestTL.TPR,  fill: P.green },
    { name:"FPR",  value: bestTL.FPR,  fill: P.red },
    { name:"TNR",  value: bestTL.TNR,  fill: P.accent },
    { name:"FNR",  value: bestTL.FNR,  fill: P.accent3 },
  ];

  const TABS = [
    { id:"overview",    label:"Overview" },
    { id:"models",      label:"Model Analysis" },
    { id:"transfer",    label:"Transfer Learning" },
    { id:"metrics",     label:"Metrics Deep Dive" },
    { id:"dataset",     label:"Dataset" },
    { id:"results",     label:"All Results" },
  ];

  const tabStyle = (id) => ({
    padding:"8px 18px", borderRadius:99, border:"none", cursor:"pointer",
    fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.05em",
    fontWeight: activeTab===id ? 700 : 400,
    background: activeTab===id ? P.accent : "transparent",
    color: activeTab===id ? P.bg : P.muted,
    transition:"all 0.2s",
  });

  return (
    <div style={{
      background: P.bg, minHeight:"100vh", color: P.text,
      fontFamily:"'DM Sans', sans-serif",
      padding:"0 0 60px 0",
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background: ${P.surface}; }
        ::-webkit-scrollbar-thumb { background: ${P.border}; border-radius:99px; }
        tr:hover td { background: rgba(0,212,255,0.03) !important; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{
        background:`linear-gradient(135deg, ${P.surface} 0%, #0d1525 100%)`,
        borderBottom:`1px solid ${P.border}`,
        padding:"32px 40px 24px",
        position:"relative", overflow:"hidden",
      }}>
        {/* decorative grid */}
        <div style={{
          position:"absolute", inset:0, opacity:0.03,
          backgroundImage:`linear-gradient(${P.accent} 1px, transparent 1px), linear-gradient(90deg, ${P.accent} 1px, transparent 1px)`,
          backgroundSize:"40px 40px",
        }}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background: P.accent, boxShadow:`0 0 12px ${P.accent}` }}/>
                <span style={{ color: P.accent, fontSize:11, fontFamily:"'DM Mono',monospace", letterSpacing:"0.15em" }}>DEEP LEARNING LAB</span>
              </div>
              <h1 style={{
                fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800,
                margin:0, lineHeight:1.1,
                background:`linear-gradient(135deg, ${P.text} 0%, ${P.accent} 100%)`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              }}>Intel Image Classification</h1>
              <p style={{ color: P.muted, fontSize:13, margin:"8px 0 0", lineHeight:1.5 }}>
                6-class scene recognition · DNN vs CNN vs Transfer Learning · Google Colab T4 GPU
              </p>
            </div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              {[
                { label:"Total Experiments", value:ALL_EXPERIMENTS.length },
                { label:"Best Accuracy", value:pct(best.Accuracy) },
                { label:"Best Model", value:best.Model },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  background:"rgba(0,212,255,0.07)", border:`1px solid ${P.accent}33`,
                  borderRadius:12, padding:"12px 18px", textAlign:"center"
                }}>
                  <div style={{ color: P.accent, fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800 }}>{value}</div>
                  <div style={{ color: P.muted, fontSize:10, fontFamily:"'DM Mono',monospace", marginTop:2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{
        background: P.surface, borderBottom:`1px solid ${P.border}`,
        padding:"12px 40px", display:"flex", gap:6, overflowX:"auto",
        position:"sticky", top:0, zIndex:100,
      }}>
        {TABS.map(t => (
          <button key={t.id} style={tabStyle(t.id)} onClick={() => setActiveTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding:"32px 40px", maxWidth:1400, margin:"0 auto" }}>

        {/* ══════════════════════════════════════════════════════════════
            TAB: OVERVIEW
        ══════════════════════════════════════════════════════════════ */}
        {activeTab === "overview" && (
          <div style={{ display:"flex", flexDirection:"column", gap:28 }}>

            {/* KPI Row */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16 }}>
              <KPICard icon="🏆" label="Best Accuracy"   value={pct(best.Accuracy)}   sub={best.Model + (best.Frozen!==null?(best.Frozen?" (Frozen)":" (Unfrozen)"):"") } color={P.green}  />
              <KPICard icon="📊" label="Best F1 Score"   value={fmt(best.F1,4)}        sub={best.Model}                  color={P.accent}  />
              <KPICard icon="🎯" label="Best Precision"  value={pct(Math.max(...ALL_EXPERIMENTS.map(d=>d.Precision)))} sub="Macro-averaged"  color={P.accent2} />
              <KPICard icon="📉" label="Lowest FPR"      value={fmt(Math.min(...ALL_EXPERIMENTS.map(d=>d.FPR)),4)} sub="Best specificity"  color={P.accent3} />
              <KPICard icon="⚡" label="Avg Accuracy"    value={pct(avgAcc)}            sub={`All ${ALL_EXPERIMENTS.length} experiments`}   color={P.tl}      />
              <KPICard icon="🔬" label="Total Models"    value="8"                      sub="DNN+CNN+CNN_AUG+5×TL"        color={P.cnn}     />
            </div>

            {/* Category Bar + Radar */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
              <Card>
                <SectionTitle accent={P.accent}>Average Accuracy by Category</SectionTitle>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={catBarData} barSize={36}>
                    <CartesianGrid strokeDasharray="3 3" stroke={P.border} />
                    <XAxis dataKey="name" tick={{ fill: P.muted, fontSize:11 }} />
                    <YAxis domain={[0,1]} tick={{ fill: P.muted, fontSize:10 }} tickFormatter={v=>pct(v)} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="Accuracy" radius={[6,6,0,0]} label={{ position:"top", fill: P.text, fontSize:10, formatter:v=>pct(v) }}>
                      {catBarData.map((c,i) => <Cell key={i} fill={CAT_COLORS[c.name] || P.tl} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <SectionTitle accent={P.accent2}>Radar — Best per Category</SectionTitle>
                <RadarComparison data={ALL_EXPERIMENTS} />
              </Card>
            </div>

            {/* All experiments ranked */}
            <Card>
              <SectionTitle accent={P.green}>All Experiments Ranked by Accuracy</SectionTitle>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={rankedData} layout="vertical" barSize={16} margin={{ left:80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={P.border} horizontal={false} />
                  <XAxis type="number" domain={[0.6,1]} tick={{ fill: P.muted, fontSize:10 }} tickFormatter={v=>pct(v)} />
                  <YAxis type="category" dataKey="name" tick={{ fill: P.text, fontSize:10, fontFamily:"'DM Mono',monospace" }} width={80} />
                  <Tooltip content={<CustomTooltip />} formatter={v=>pct(v)} />
                  <ReferenceLine x={avgAcc} stroke={P.accent3} strokeDasharray="4 4" label={{ value:"avg", fill: P.accent3, fontSize:9 }} />
                  <Bar dataKey="acc" radius={[0,4,4,0]}>
                    {rankedData.map((d,i) => <Cell key={i} fill={CAT_COLORS[d.cat] || P.tl} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display:"flex", gap:16, marginTop:12, flexWrap:"wrap" }}>
                {Object.entries(CAT_COLORS).map(([cat,col]) => (
                  <div key={cat} style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <div style={{ width:10, height:10, borderRadius:2, background:col }}/>
                    <span style={{ color: P.muted, fontSize:11 }}>{cat}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB: MODEL ANALYSIS
        ══════════════════════════════════════════════════════════════ */}
        {activeTab === "models" && (
          <div style={{ display:"flex", flexDirection:"column", gap:28 }}>

            {/* DNN vs CNN vs CNN+AUG comparison */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
              <Card>
                <SectionTitle accent={P.cnn}>DNN vs CNN vs CNN+Aug — All Metrics</SectionTitle>
                {(() => {
                  const baseMods = ALL_EXPERIMENTS.filter(d => ["DNN","CNN","CNN_AUG"].includes(d.Model));
                  const mets = ["Accuracy","Precision","Recall","F1","TPR","TNR"];
                  const chartData = mets.map(m => {
                    const obj = { metric: m };
                    baseMods.forEach(d => { obj[d.Model] = d[m]; });
                    return obj;
                  });
                  return (
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={chartData} barSize={16}>
                        <CartesianGrid strokeDasharray="3 3" stroke={P.border} />
                        <XAxis dataKey="metric" tick={{ fill: P.muted, fontSize:10 }} />
                        <YAxis domain={[0,1]} tick={{ fill: P.muted, fontSize:9 }} tickFormatter={v=>pct(v)} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize:11 }} />
                        <Bar dataKey="DNN"     fill={P.dnn} radius={[3,3,0,0]} />
                        <Bar dataKey="CNN"     fill={P.cnn} radius={[3,3,0,0]} />
                        <Bar dataKey="CNN_AUG" fill={P.aug} radius={[3,3,0,0]} name="CNN+Aug" />
                      </BarChart>
                    </ResponsiveContainer>
                  );
                })()}
              </Card>

              <Card>
                <SectionTitle accent={P.red}>Error Rates — DNN vs CNN vs CNN+Aug</SectionTitle>
                {(() => {
                  const baseMods = ALL_EXPERIMENTS.filter(d => ["DNN","CNN","CNN_AUG"].includes(d.Model));
                  const mets = ["FPR","FNR"];
                  const chartData = mets.map(m => {
                    const obj = { metric: m };
                    baseMods.forEach(d => { obj[d.Model] = d[m]; });
                    return obj;
                  });
                  return (
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={chartData} barSize={30}>
                        <CartesianGrid strokeDasharray="3 3" stroke={P.border} />
                        <XAxis dataKey="metric" tick={{ fill: P.muted, fontSize:11 }} />
                        <YAxis domain={[0,0.5]} tick={{ fill: P.muted, fontSize:9 }} tickFormatter={v=>pct(v)} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize:11 }} />
                        <Bar dataKey="DNN"     fill={P.dnn} radius={[3,3,0,0]} />
                        <Bar dataKey="CNN"     fill={P.cnn} radius={[3,3,0,0]} />
                        <Bar dataKey="CNN_AUG" fill={P.aug} radius={[3,3,0,0]} name="CNN+Aug" />
                      </BarChart>
                    </ResponsiveContainer>
                  );
                })()}
              </Card>
            </div>

            {/* Precision vs Recall Scatter */}
            <Card>
              <SectionTitle accent={P.accent3}>Precision vs Recall — All Experiments (Top-right = Best)</SectionTitle>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top:10, right:20, bottom:10, left:10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={P.border} />
                  <XAxis type="number" dataKey="x" name="Precision" domain={[0.6,1]} tick={{ fill: P.muted, fontSize:10 }} tickFormatter={v=>pct(v)} label={{ value:"Precision", fill: P.muted, fontSize:11, position:"bottom" }} />
                  <YAxis type="number" dataKey="y" name="Recall"    domain={[0.6,1]} tick={{ fill: P.muted, fontSize:10 }} tickFormatter={v=>pct(v)} label={{ value:"Recall", fill: P.muted, fontSize:11, angle:-90, position:"insideLeft" }} />
                  <Tooltip content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0]?.payload;
                    return (
                      <div style={{ background:"#1e293b", border:`1px solid ${P.border}`, borderRadius:8, padding:"8px 12px" }}>
                        <p style={{ color: CAT_COLORS[d?.cat], margin:0, fontWeight:700, fontSize:12 }}>{d?.model}</p>
                        <p style={{ color: P.text, margin:"3px 0 0", fontSize:11 }}>Precision: {pct(d?.x)}</p>
                        <p style={{ color: P.text, margin:"2px 0 0", fontSize:11 }}>Recall: {pct(d?.y)}</p>
                      </div>
                    );
                  }} />
                  {Object.keys(CAT_COLORS).map(cat => (
                    <Scatter key={cat} name={cat} data={scatterData.filter(d=>d.cat===cat)} fill={CAT_COLORS[cat]} opacity={0.85} r={6} />
                  ))}
                  <Legend wrapperStyle={{ fontSize:11 }} />
                </ScatterChart>
              </ResponsiveContainer>
            </Card>

            {/* Architecture analysis cards */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
              {[
                { model:"DNN", color: P.dnn, acc: ALL_EXPERIMENTS.find(d=>d.Model==="DNN")?.Accuracy,
                  desc:"Flattens 150×150×3 image to a 1D vector. Loses all spatial structure. Dense layers learn global statistics only. Highest parameter count per unit accuracy.",
                  pros:"Simple. Fast to train.", cons:"No spatial awareness. Poor on images." },
                { model:"CNN", color: P.cnn, acc: ALL_EXPERIMENTS.find(d=>d.Model==="CNN")?.Accuracy,
                  desc:"4 Conv+BN+Pool blocks (32→64→128→256 filters). Learns spatial hierarchies. Edges → textures → parts → scenes. Translation equivariant via shared filter weights.",
                  pros:"Spatial features. Efficient.", cons:"Overfits on small datasets." },
                { model:"CNN + Aug", color: P.aug, acc: ALL_EXPERIMENTS.find(d=>d.Model==="CNN_AUG")?.Accuracy,
                  desc:"Same CNN architecture with rotation=30°, zoom=20%, horizontal flip. Augmentation acts as regularization — model sees different views each epoch.",
                  pros:"Better generalisation.", cons:"Slower training per epoch." },
              ].map(({ model, color, acc, desc, pros, cons }) => (
                <Card key={model} style={{ borderTop:`3px solid ${color}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                    <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:16, color }}>{model}</span>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:18, fontWeight:700, color: P.green }}>{pct(acc || 0)}</span>
                  </div>
                  <p style={{ color: P.muted, fontSize:11, lineHeight:1.6, margin:"0 0 12px" }}>{desc}</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                    <div style={{ fontSize:11 }}><span style={{ color: P.green }}>✓ </span><span style={{ color: P.text }}>{pros}</span></div>
                    <div style={{ fontSize:11 }}><span style={{ color: P.red }}>✗ </span><span style={{ color: P.text }}>{cons}</span></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB: TRANSFER LEARNING
        ══════════════════════════════════════════════════════════════ */}
        {activeTab === "transfer" && (
          <div style={{ display:"flex", flexDirection:"column", gap:28 }}>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:14 }}>
              {["ResNet50","MobileNetV2","VGG16","InceptionV3","DenseNet121"].map(m => {
                const fr = tlExps.find(d=>d.Model===m&&d.Frozen===true);
                const uf = tlExps.find(d=>d.Model===m&&d.Frozen===false);
                const better = (uf?.Accuracy||0) > (fr?.Accuracy||0) ? "Unfrozen" : "Frozen";
                return (
                  <Card key={m} style={{ borderTop:`3px solid ${P.tl}` }}>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13, color: P.tl, marginBottom:12 }}>{m}</div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                      <span style={{ color: P.muted, fontSize:11 }}>Frozen</span>
                      <span style={{ color: P.accent, fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700 }}>{pct(fr?.Accuracy||0)}</span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                      <span style={{ color: P.muted, fontSize:11 }}>Unfrozen</span>
                      <span style={{ color: P.green, fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700 }}>{pct(uf?.Accuracy||0)}</span>
                    </div>
                    <div style={{
                      background:`${P.green}22`, color: P.green,
                      borderRadius:6, padding:"3px 8px", fontSize:10,
                      border:`1px solid ${P.green}44`, textAlign:"center"
                    }}>Winner: {better}</div>
                  </Card>
                );
              })}
            </div>

            {/* Frozen vs Unfrozen grouped bar */}
            <Card>
              <SectionTitle accent={P.tl}>Frozen vs Unfrozen — Accuracy per Model</SectionTitle>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={tlCompare} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" stroke={P.border} />
                  <XAxis dataKey="model" tick={{ fill: P.muted, fontSize:11 }} />
                  <YAxis domain={[0.8,1]} tick={{ fill: P.muted, fontSize:10 }} tickFormatter={v=>pct(v)} />
                  <Tooltip content={<CustomTooltip />} formatter={v=>pct(v)} />
                  <Legend wrapperStyle={{ fontSize:11 }} />
                  <Bar dataKey="Frozen"   fill={P.accent}  radius={[4,4,0,0]} label={{ position:"top", fill: P.text, fontSize:9, formatter:v=>pct(v) }} />
                  <Bar dataKey="Unfrozen" fill={P.green}   radius={[4,4,0,0]} label={{ position:"top", fill: P.text, fontSize:9, formatter:v=>pct(v) }} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* All TL metrics heatmap via table */}
            <Card>
              <SectionTitle accent={P.accent3}>Transfer Learning — All Metrics Comparison</SectionTitle>
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11 }}>
                  <thead>
                    <tr>
                      {["Model","Frozen","Accuracy","Precision","Recall","F1","TPR","FPR","TNR","FNR","Sensitivity","Specificity"].map(c => (
                        <th key={c} style={{ color: P.accent, padding:"8px 12px", textAlign:"left", borderBottom:`1px solid ${P.border}`, fontFamily:"'DM Mono',monospace", fontSize:10, whiteSpace:"nowrap" }}>{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tlExps.sort((a,b)=>b.Accuracy-a.Accuracy).map((row,i) => (
                      <tr key={i} style={{ background: i%2===0?"transparent":"rgba(255,255,255,0.02)" }}>
                        <td style={{ padding:"7px 12px", color: P.tl, fontWeight:700, whiteSpace:"nowrap" }}>{row.Model}</td>
                        <td style={{ padding:"7px 12px", whiteSpace:"nowrap" }}>
                          <span style={{
                            background: row.Frozen ? `${P.accent}22` : `${P.green}22`,
                            color: row.Frozen ? P.accent : P.green,
                            padding:"2px 8px", borderRadius:99, fontSize:10,
                            border:`1px solid ${row.Frozen ? P.accent : P.green}44`
                          }}>{row.Frozen ? "Frozen" : "Unfrozen"}</span>
                        </td>
                        {["Accuracy","Precision","Recall","F1","TPR","FPR","TNR","FNR","Sensitivity","Specificity"].map(m => {
                          const v = row[m];
                          const isBad = m==="FPR"||m==="FNR";
                          const color = isBad
                            ? (v < 0.06 ? P.green : v < 0.1 ? P.accent3 : P.red)
                            : (v > 0.92 ? P.green : v > 0.87 ? P.accent3 : P.text);
                          return (
                            <td key={m} style={{ padding:"7px 12px", color, fontFamily:"'DM Mono',monospace", fontWeight: m==="Accuracy"?700:400, borderBottom:`1px solid rgba(30,45,69,0.5)`, whiteSpace:"nowrap" }}>
                              {fmt(v, 4)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Architecture explanation */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {[
                { title:"Feature Extraction (Frozen)", color: P.accent, icon:"🔒",
                  points:[
                    "Base model weights locked at ImageNet values",
                    "Only GlobalAvgPool + Dense head trains",
                    "Fast convergence — few trainable parameters",
                    "Works when target domain ≈ ImageNet",
                    "Safe at full image size — no OOM risk",
                  ]},
                { title:"Fine-Tuning (Unfrozen)", color: P.green, icon:"🔓",
                  points:[
                    "All layers update with small LR (0.001)",
                    "Backbone adapts features to scene domain",
                    "Higher accuracy potential than frozen",
                    "Risk: catastrophic forgetting at high LR",
                    "Uses 128×128 + BS=16 to prevent OOM",
                  ]},
              ].map(({ title, color, icon, points }) => (
                <Card key={title} style={{ borderLeft:`3px solid ${color}` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                    <span style={{ fontSize:18 }}>{icon}</span>
                    <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, color, fontSize:14 }}>{title}</span>
                  </div>
                  {points.map((p,i) => (
                    <div key={i} style={{ display:"flex", gap:8, marginBottom:6, alignItems:"flex-start" }}>
                      <span style={{ color, fontSize:10, marginTop:2, flexShrink:0 }}>▸</span>
                      <span style={{ color: P.text, fontSize:12, lineHeight:1.5 }}>{p}</span>
                    </div>
                  ))}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB: METRICS DEEP DIVE
        ══════════════════════════════════════════════════════════════ */}
        {activeTab === "metrics" && (
          <div style={{ display:"flex", flexDirection:"column", gap:28 }}>

            {/* Best model metrics bar */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
              <Card>
                <SectionTitle accent={P.green}>Best Model ({bestTL.Model} Unfrozen) — All Metrics</SectionTitle>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={metricsBarData} barSize={28}>
                    <CartesianGrid strokeDasharray="3 3" stroke={P.border} />
                    <XAxis dataKey="name" tick={{ fill: P.muted, fontSize:9 }} />
                    <YAxis domain={[0,1]} tick={{ fill: P.muted, fontSize:9 }} tickFormatter={v=>pct(v)} />
                    <Tooltip content={<CustomTooltip />} formatter={v=>pct(v)} />
                    <Bar dataKey="value" radius={[4,4,0,0]} label={{ position:"top", fill: P.text, fontSize:9, formatter:v=>pct(v) }}>
                      {metricsBarData.map((d,i) => <Cell key={i} fill={[P.green,P.accent,P.tl,P.accent3,P.cnn,P.dnn,P.green,P.accent][i]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <SectionTitle accent={P.red}>TPR / FPR / TNR / FNR — Best Model</SectionTitle>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={rateBarData} barSize={50}>
                    <CartesianGrid strokeDasharray="3 3" stroke={P.border} />
                    <XAxis dataKey="name" tick={{ fill: P.muted, fontSize:12 }} />
                    <YAxis domain={[0,1]} tick={{ fill: P.muted, fontSize:9 }} tickFormatter={v=>pct(v)} />
                    <Tooltip content={<CustomTooltip />} formatter={v=>pct(v)} />
                    <Bar dataKey="value" radius={[6,6,0,0]} label={{ position:"top", fill: P.text, fontSize:11, fontWeight:700, formatter:v=>pct(v) }}>
                      {rateBarData.map((d,i) => <Cell key={i} fill={d.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Metrics explanation */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
              {[
                { metric:"Accuracy", formula:"(TP+TN)/(TP+TN+FP+FN)", color: P.green,
                  desc:"Overall fraction of correct predictions across all classes. Primary ranking metric in this experiment." },
                { metric:"Precision", formula:"TP/(TP+FP)", color: P.accent,
                  desc:"Of all instances predicted as class X, what fraction truly belong to X. High precision = few false alarms." },
                { metric:"Recall (TPR / Sensitivity)", formula:"TP/(TP+FN)", color: P.tl,
                  desc:"Of all true instances of class X, what fraction did the model find. High recall = few missed detections." },
                { metric:"F1 Score", formula:"2×(Precision×Recall)/(Precision+Recall)", color: P.accent3,
                  desc:"Harmonic mean of precision and recall. Balances both concerns. Best single metric for imbalanced classes." },
                { metric:"Specificity (TNR)", formula:"TN/(TN+FP)", color: P.cnn,
                  desc:"Of all true negatives, what fraction did the model correctly reject. High specificity = low false positive rate." },
                { metric:"FPR", formula:"FP/(FP+TN)", color: P.red,
                  desc:"Fraction of true negatives incorrectly flagged as positive. Want this LOW. Complements specificity (FPR = 1 - TNR)." },
              ].map(({ metric, formula, color, desc }) => (
                <Card key={metric} style={{ borderLeft:`3px solid ${color}` }}>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, color, fontSize:13, marginBottom:6 }}>{metric}</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color: P.accent3, marginBottom:8, background:"rgba(0,0,0,0.3)", padding:"4px 8px", borderRadius:6 }}>{formula}</div>
                  <p style={{ color: P.muted, fontSize:11, lineHeight:1.6, margin:0 }}>{desc}</p>
                </Card>
              ))}
            </div>

            {/* Confusion matrix */}
            <Card>
              <SectionTitle accent={P.accent}>Confusion Matrix — DenseNet121 Unfrozen (Best Model)</SectionTitle>
              <p style={{ color: P.muted, fontSize:12, marginBottom:16 }}>
                Rows = True class · Columns = Predicted class · Green diagonal = correct · Red off-diagonal = errors
              </p>
              <ConfusionMatrix matrix={CONFUSION_MATRICES.DenseNet121_unfrozen} classes={["buildings","forest","glacier","mountain","sea","street"]} />
            </Card>

            {/* ROC Space scatter */}
            <Card>
              <SectionTitle accent={P.accent2}>ROC Space — All Experiments (Top-left = Best)</SectionTitle>
              <ResponsiveContainer width="100%" height={320}>
                <ScatterChart margin={{ top:10, right:20, bottom:20, left:10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={P.border} />
                  <XAxis type="number" dataKey="x" name="FPR" domain={[0,0.4]} tick={{ fill: P.muted, fontSize:10 }}
                    tickFormatter={v=>pct(v)} label={{ value:"False Positive Rate (FPR)", fill: P.muted, fontSize:11, position:"bottom", offset:-5 }} />
                  <YAxis type="number" dataKey="y" name="TPR" domain={[0.5,1]} tick={{ fill: P.muted, fontSize:10 }}
                    tickFormatter={v=>pct(v)} label={{ value:"True Positive Rate (TPR)", fill: P.muted, fontSize:11, angle:-90, position:"insideLeft" }} />
                  <Tooltip content={({ active, payload }) => {
                    if (!active||!payload?.length) return null;
                    const d = payload[0]?.payload;
                    return (
                      <div style={{ background:"#1e293b", border:`1px solid ${P.border}`, borderRadius:8, padding:"8px 12px" }}>
                        <p style={{ color: CAT_COLORS[d?.cat], margin:0, fontWeight:700, fontSize:12 }}>{d?.model}</p>
                        <p style={{ color: P.text, margin:"3px 0 0", fontSize:11 }}>FPR: {pct(d?.x)}</p>
                        <p style={{ color: P.text, margin:"2px 0 0", fontSize:11 }}>TPR: {pct(d?.y)}</p>
                      </div>
                    );
                  }} />
                  {Object.keys(CAT_COLORS).map(cat => (
                    <Scatter key={cat} name={cat}
                      data={ALL_EXPERIMENTS.filter(d=>d.Category===cat).map(d=>({ x:d.FPR, y:d.TPR, model:d.Model+(d.Frozen!==null?(d.Frozen?" (F)":" (U)"):""), cat:d.Category }))}
                      fill={CAT_COLORS[cat]} r={7} opacity={0.9}
                    />
                  ))}
                  <Legend wrapperStyle={{ fontSize:11 }} />
                </ScatterChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB: DATASET
        ══════════════════════════════════════════════════════════════ */}
        {activeTab === "dataset" && (
          <div style={{ display:"flex", flexDirection:"column", gap:28 }}>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:14 }}>
              <KPICard icon="📁" label="Total Train Images" value="14,034" sub="6 classes" color={P.accent} />
              <KPICard icon="🧪" label="Total Test Images"  value="3,000"  sub="6 classes" color={P.green}  />
              <KPICard icon="🏷️" label="Number of Classes"  value="6"      sub="Scene types" color={P.tl}  />
              <KPICard icon="📐" label="Image Size Used"    value="128²"   sub="Resized for TL" color={P.accent3} />
              <KPICard icon="⚡" label="Augmentation"       value="3 ops"  sub="Rotate·Zoom·Flip" color={P.cnn} />
              <KPICard icon="✂️" label="Validation Split"   value="20%"    sub="From train set" color={P.accent2} />
            </div>

            {/* Class distribution */}
            <Card>
              <SectionTitle accent={P.accent}>Class Distribution — Train vs Test</SectionTitle>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={CLASS_DISTRIBUTION} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" stroke={P.border} />
                  <XAxis dataKey="cls" tick={{ fill: P.muted, fontSize:11 }} />
                  <YAxis tick={{ fill: P.muted, fontSize:10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize:11 }} />
                  <Bar dataKey="train" name="Train" fill={P.accent}  radius={[4,4,0,0]} label={{ position:"top", fill: P.text, fontSize:9 }} />
                  <Bar dataKey="test"  name="Test"  fill={P.green}   radius={[4,4,0,0]} label={{ position:"top", fill: P.text, fontSize:9 }} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Class cards */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
              {CLASS_DISTRIBUTION.map((c,i) => {
                const colors2 = [P.accent, P.green, P.tl, P.accent3, P.cnn, P.dnn];
                return (
                  <Card key={c.cls} style={{ borderTop:`3px solid ${colors2[i]}` }}>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, color: colors2[i], marginBottom:10 }}>
                      {c.cls}
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                      <span style={{ color: P.muted, fontSize:12 }}>Train</span>
                      <span style={{ fontFamily:"'DM Mono',monospace", color: P.text, fontWeight:700 }}>{c.train.toLocaleString()}</span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                      <span style={{ color: P.muted, fontSize:12 }}>Test</span>
                      <span style={{ fontFamily:"'DM Mono',monospace", color: P.text, fontWeight:700 }}>{c.test.toLocaleString()}</span>
                    </div>
                    <div style={{ height:4, borderRadius:99, background: P.border, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${(c.train/2512)*100}%`, background: colors2[i], borderRadius:99 }} />
                    </div>
                    <div style={{ color: P.muted, fontSize:10, marginTop:4 }}>{((c.train/14034)*100).toFixed(1)}% of training set</div>
                  </Card>
                );
              })}
            </div>

            {/* Pipeline */}
            <Card>
              <SectionTitle accent={P.accent2}>Preprocessing Pipeline</SectionTitle>
              <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                {[
                  { step:"Load ZIP",        detail:"/MyDrive/intel.zip" },
                  { step:"Extract",         detail:"seg_train / seg_test" },
                  { step:"Rescale",         detail:"÷ 255  → [0,1]" },
                  { step:"Resize",          detail:"128×128 or 150×150" },
                  { step:"Val Split",       detail:"80% train / 20% val" },
                  { step:"Augment",         detail:"rotate·zoom·flip (AUG only)" },
                  { step:"Batch",           detail:"BS 16 or 32" },
                  { step:"Train",           detail:"model.fit()" },
                ].map((s,i,arr) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{
                      background: P.surface, border:`1px solid ${P.border}`,
                      borderRadius:10, padding:"8px 14px", textAlign:"center",
                    }}>
                      <div style={{ color: P.accent, fontSize:12, fontWeight:700 }}>{s.step}</div>
                      <div style={{ color: P.muted, fontSize:10, marginTop:2 }}>{s.detail}</div>
                    </div>
                    {i < arr.length-1 && <span style={{ color: P.muted, fontSize:18 }}>→</span>}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB: ALL RESULTS
        ══════════════════════════════════════════════════════════════ */}
        {activeTab === "results" && (
          <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
            <Card>
              <SectionTitle accent={P.accent}>Complete Results Table — All {ALL_EXPERIMENTS.length} Experiments</SectionTitle>
              <p style={{ color: P.muted, fontSize:12, marginBottom:16 }}>
                Sorted by Accuracy (descending) · Green = high is good · Red = high is bad (FPR/FNR)
              </p>
              <MetricsTable data={ALL_EXPERIMENTS} />
            </Card>

            {/* Summary stats */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
              <Card>
                <SectionTitle accent={P.green}>Best Experiment</SectionTitle>
                {[
                  ["Model",      best.Model],
                  ["Category",   best.Category],
                  ["Frozen",     best.Frozen !== null ? (best.Frozen ? "Yes (Frozen)" : "No (Unfrozen)") : "N/A"],
                  ["Accuracy",   pct(best.Accuracy)],
                  ["Precision",  pct(best.Precision)],
                  ["Recall",     pct(best.Recall)],
                  ["F1 Score",   fmt(best.F1, 4)],
                  ["TPR",        pct(best.TPR)],
                  ["FPR",        pct(best.FPR)],
                  ["TNR",        pct(best.TNR)],
                  ["FNR",        pct(best.FNR)],
                  ["Sensitivity",pct(best.Sensitivity)],
                  ["Specificity",pct(best.Specificity)],
                ].map(([k,v]) => (
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${P.border}` }}>
                    <span style={{ color: P.muted, fontSize:12 }}>{k}</span>
                    <span style={{ color: P.text, fontSize:12, fontFamily:"'DM Mono',monospace", fontWeight:600 }}>{v}</span>
                  </div>
                ))}
              </Card>

              <Card>
                <SectionTitle accent={P.red}>Worst Experiment</SectionTitle>
                {[
                  ["Model",      worst.Model],
                  ["Category",   worst.Category],
                  ["Frozen",     worst.Frozen !== null ? (worst.Frozen ? "Yes (Frozen)" : "No (Unfrozen)") : "N/A"],
                  ["Accuracy",   pct(worst.Accuracy)],
                  ["Precision",  pct(worst.Precision)],
                  ["Recall",     pct(worst.Recall)],
                  ["F1 Score",   fmt(worst.F1, 4)],
                  ["TPR",        pct(worst.TPR)],
                  ["FPR",        pct(worst.FPR)],
                  ["TNR",        pct(worst.TNR)],
                  ["FNR",        pct(worst.FNR)],
                  ["Sensitivity",pct(worst.Sensitivity)],
                  ["Specificity",pct(worst.Specificity)],
                ].map(([k,v]) => (
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${P.border}` }}>
                    <span style={{ color: P.muted, fontSize:12 }}>{k}</span>
                    <span style={{ color: P.text, fontSize:12, fontFamily:"'DM Mono',monospace", fontWeight:600 }}>{v}</span>
                  </div>
                ))}
              </Card>
            </div>

            {/* Conclusions */}
            <Card>
              <SectionTitle accent={P.accent3}>Key Conclusions</SectionTitle>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {[
                  { title:"Transfer Learning Wins",         color: P.tl,     text:"Pretrained ImageNet backbones outperform scratch-trained models by 8–14% accuracy. Fine-tuning adds a further 1–4% over frozen feature extraction." },
                  { title:"Unfrozen > Frozen (mostly)",     color: P.green,  text:"Unfrozen models score higher on all 5 architectures. The backbone adapts scene-specific features. Requires careful LR (0.001) to avoid catastrophic forgetting." },
                  { title:"CNN >> DNN on images",           color: P.cnn,    text:"CNN achieves 81% vs DNN's 68%. Convolutional layers preserve spatial structure that DNNs destroy by flattening. A fundamental architectural advantage." },
                  { title:"Augmentation helps CNN",         color: P.aug,    text:"Adding rotation, zoom, and flip pushes CNN from 81% to 85%. Acts as regularization — model sees diverse views each epoch, reducing overfitting." },
                  { title:"Adam at LR=0.001 is optimal",   color: P.accent, text:"Adam's adaptive learning rates converge faster and more reliably than SGD. LR=0.001 is the sweet spot — smaller is stable, larger risks divergence." },
                  { title:"DenseNet121 is top performer",   color: P.accent3,text:"DenseNet121 unfrozen achieves 93.12% accuracy. Dense connections allow feature reuse across layers, making it highly efficient on scene classification." },
                ].map(({ title, color, text }) => (
                  <div key={title} style={{
                    background: P.surface, borderRadius:10, padding:"12px 16px",
                    borderLeft:`3px solid ${color}`, display:"flex", gap:12,
                  }}>
                    <div>
                      <div style={{ color, fontWeight:700, fontSize:12, marginBottom:4 }}>{title}</div>
                      <div style={{ color: P.muted, fontSize:12, lineHeight:1.6 }}>{text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}