#!/bin/bash

# Check if a base directory is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <base-directory>"
    exit 1
fi

# Read the base directory
BASE_DIR=$1

# Directory names
DIR_NAMES=(
    "dominant_hand_front_up"
    "dominant_hand_front_left_up"
    "dominant_hand_front_right_up"
    "dominant_hand_front_top_up_back"
    "dominant_hand_front_bottom_up_front"
    "dominant_hand_front_side_opposite"
    "dominant_hand_front_side_same"
    "dominant_hand_down_front"
    "dominant_hand_down_side_opposite"
    "dominant_hand_down_side_same"
    "dominant_hand_back_up"
    "dominant_hand_back_side_opposite"
    "dominant_hand_back_down"
    "nondominant_hand_front_up"
    "nondominant_hand_front_left_up"
    "nondominant_hand_front_right_up"
    "nondominant_hand_front_top_up_back"
    "nondominant_hand_front_bottom_up_front"
    "nondominant_hand_front_side_opposite"
    "nondominant_hand_front_side_same"
    "nondominant_hand_down_front"
    "nondominant_hand_down_side_opposite"
    "nondominant_hand_down_side_same"
    "nondominant_hand_back_up"
    "nondominant_hand_back_side_opposite"
    "nondominant_hand_back_down"
)

# Create directories
for dir_name in "${DIR_NAMES[@]}"; do
    mkdir -p "$BASE_DIR/$dir_name"
    echo "Created directory: $BASE_DIR/$dir_name"
done

echo "All directories created successfully."
