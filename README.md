# Google Maps API Place Fetcher

This project fetches nearby places of interest using the Google Maps Places API. It allows you to specify a location, radius, and place types to retrieve data for various categories of places.

## Features

- Fetches places based on categories (e.g., restaurants, parks, museums, etc.).
- Supports pagination to retrieve multiple pages of results.
- Saves the fetched data as JSON files in an `output` directory.
- Uses a `.env` file to securely store API keys and configuration.

---

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:

   ```properties
   API_KEY=your_google_maps_api_key
   LOCATION=latitude,longitude
   RADIUS=5000
   MAX_PAGES=5
   ```

   Replace `your_google_maps_api_key` with your Google Maps API key and adjust the `LOCATION`, `RADIUS`, and `MAX_PAGES` values as needed.

4. Ensure the `placeType.js` file contains the categories you want to fetch.

---

## Usage

1. Run the script:

   ```bash
   node placeApi.mjs
   ```

2. The fetched data will be saved as JSON files in the `output` directory.

---

## File Structure

```
.
├── .env                # Environment variables
├── placeApi.mjs        # Main script to fetch places
├── placeType.js        # Contains the list of place categories
├── output/             # Directory where fetched data is saved
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

---

## Example Output

After running the script, the `output` directory will contain JSON files for each category, e.g.:

```
output/
├── restaurant.json
├── park.json
├── museum.json
└── ...
```

---

## Notes

- Ensure your Google Maps API key has the necessary permissions for the Places API.
- The script uses the `dotenv` package to load environment variables from the `.env` file.

---

## License

This project is licensed under the MIT License.
