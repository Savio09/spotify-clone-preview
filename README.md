# Spotify Preview Clone

## Overview of the application

Spotify Preview Clone is a web application that allows users to search for music, view artist information, and listen to short previews of tracks. The application is built using React for the frontend and Express.js for the backend, with integration to third-party APIs for fetching music data.

## Features

- **Search Functionality**: Users can search for music tracks and artists.
- **Music Preview**: Listen to short previews of tracks directly within the application.
- **Artist Information**: View detailed information about artists, including a summary and images.
- **Responsive Design**: The application is designed to be responsive and works well on both desktop and mobile devices.
- **Interactive UI**: The application features a modern and interactive user interface with smooth transitions and animations.

## Inspiration

The inspiration for this project came from the desire to create a simplified version of Spotify that focuses on providing quick previews of music tracks. The goal was to build an application that is easy to use and provides essential features for music discovery.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **React Context API**: For state management across the application.
- **CSS**: For styling the application.
- **Create React App**: For bootstrapping the React application.

### Backend

- **Express.js**: A web application framework for Node.js.
- **Axios**: For making HTTP requests to third-party APIs.
- **dotenv**: For managing environment variables.

### APIs

- **OpenAI API**: For generating artist summaries.
- **Deezer API**: For fetching music previews.
- **Shazam API**: For searching music tracks and fetching autocomplete suggestions.

## Project Structure

```
client/
  ├── build/
  ├── public/
  ├── src/
  │   ├── containers/
  │   ├── images/
  │   ├── navigation/
  │   ├── App.css
  │   ├── App.js
  │   ├── content.js
  │   ├── ExpansionContext.js
  │   ├── index.css
  │   ├── index.js
  │   ├── SearchContext.js
  ├── .gitignore
  ├── package.json
  ├── README.md
server/
  ├── .env
  ├── app.js
  ├── package.json
```

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/spotify-preview-clone.git
```

2. Navigate to the

client

directory and install dependencies:

```sh
cd client
npm install
```

3. Navigate to the

server

directory and install dependencies:

```sh
cd ../server
npm install
```

4. Create a

.env

file in the

server

directory and add your API keys:

```
API_KEY=your_openai_api_key
RAPIDAPI_KEY_SHAZAM=your_shazam_api_key
RAPIDAPI_KEY_DEEZER=your_deezer_api_key
PORT=5000
```

### Running the Application

1. Start the backend server:

```sh
cd server
npm start
```

2. Start the frontend development server:

```sh
cd ../client
npm start
```

3. Open your browser and navigate to `http://localhost:3000`.

## Potential Next Steps

- **User Authentication**: Implement user authentication to allow users to save their favorite tracks and playlists.
- **Full Track Playback**: Integrate with a music streaming service to allow full track playback.
- **Enhanced Search**: Improve the search functionality to include more filters and sorting options.
- **Playlist Creation**: Allow users to create and manage their own playlists.
- **Social Features**: Add social features such as sharing tracks and following other users.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

Thank you for using Spotify Preview Clone! We hope you enjoy discovering new music with our application.
