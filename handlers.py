from rapidfuzz import process as rapid_process
from data import mock_recipes
import logging

logger = logging.getLogger(__name__)

# Function to process user input and fetch video/audio content
def process_user_input(user_input):
    try:
        # Normalize user input
        user_input = user_input.lower().strip()
        if not user_input:
            return {"error": "Input cannot be empty."}
        
        logger.info(f"Processing user input: {user_input}")

        if user_input in mock_recipes:
            # Exact match for user input in mock_recipes
            return {
                "video_url": mock_recipes[user_input]["video_url"],
                "sound_url": mock_recipes[user_input]["sound_url"]
            }
        
        # Fuzzy matching
        matched_content = rapid_process.extractOne(user_input, mock_recipes.keys(), score_cutoff=70)
        if matched_content:
            content_name = matched_content[0]
            return {
                "video_url": mock_recipes[content_name]["video_url"],
                "sound_url": mock_recipes[content_name]["sound_url"]
            }
        
        # No match found
        return {"error": "No matching video or audio content found."}

    except Exception as e:
        logger.error(f"Error processing user input: {e}")
        return {"error": "An error occurred while processing your request."}
























