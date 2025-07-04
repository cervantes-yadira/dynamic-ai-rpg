# Dynamic AI RPG

This is a text-based RPG game powered by AI. Players can send messages, view responses, and interact through a chat interface. The AI model acts as a "dungeon master," creating scenarios and keeping the story moving. The atmosphere is enhanced with images generated by another model, matching the current events.

## Project Structure

- **`/src`** — contains the main files for the project.
- **`/config`** — holds configuration files and variables.
- **`/controller`** — contains the business logic for routes.
- **`/public`** — serves all publicly available files, including the main webpage, styles, scripts, and images.
- **`/router`** — defines all routes for the app (used to handle API requests).
- **`/services`** — contains functions for interacting with external APIs (like sending messages to the LLM and retrieving images).

## Setup

To use it:

1. **Install [Node.js](https://nodejs.org/en/download)**

2. **Clone the repository:**
    ```
    git clone https://github.com/cervantes-yadira/dynamic-ai-rpg.git
    ```
3. **Open/navigate to the project folder**
    ```
    cd <project-folder-name>
    ```
4. **In the terminal, run this command:**
    ```
    npm i
    ```
5. **Go to [Google AI Studio](https://aistudio.google.com/apikey) and [GroqCloud](https://console.groq.com/keys) and get your free API keys**
6. **Create a **`.env`** file in the project root**
7. **Add these variables in the **`.env`**  file:**
    ```
    GROQ_API_KEY=*Your Groq API key*
    GEMINI_API_KEY=*Your Google API key*
    ```
8. **You're all done with the setup!**

## How to Run the Project

1. **Open/navigate to the project folder**
    ```
    cd <project-folder-name>
    ```
2. **In the terminal, run this command:**
    ```
    npm run start
    ```
3. **You should see this line, open the provided url in your browser:**
    ```
    Listening on port 4509 at http://localhost:4509
    ```
4. **Now you can test the project!**

## How it Works

When a user first loads up the webpage, they can click a button that will create session variables for storing things like chat history, number of user responses, and whether the game has started.

Users will also be presented with a chat interface where they can interact with the model. To start the game, users can begin to introduce their character or simply say “hello” to kick things off.

The model will respond by asking clarifying questions about the player’s character or by starting to describe the journey. How the model should respond and any specific requirements are defined in the system instructions.

Each response is appended to the chat interface using helper functions in the `helpers.js` file, allowing users to view the chat history.

To create a coherent story, the model is given context with each request. The context consists of the last 2 messages from both the system and the user. This “window” is maintained by the `retreiveWindow()` function in the `api.js` file. It takes in the chat log from session storage, slices the last 2 responses, iterates through them, and adds them to the context.

An image is created alongside each system response to reflect the setting of the game at that moment in the story. That image is then rendered on the webpage to help add atmosphere.

When users refresh the page, they keep their game history and can pick up where they left off, because of session storage. However, once the tab is closed, their progress is lost.

## API Integration

I used Gemini for image generation and Llama (using Groq) for text generation.

### Gemini

To use this model, I first created a `GoogleGenAI` instance using my API key. From there, I used the `generateContent()` function and defined the model, context, and the types of responses I needed.

The `gemini-2.0-flash-preview-image-generation` model doesn't support generating only images, so I also needed to request text alongside the image.

To store and use the image, I filter through the response to extract the image and then write it to a file in the `images` directory (under the `public` directory).

### Llama

To use `llama3-70b-8192`, I created a `Groq` instance with my Groq API key. I then used the `create()` function to make a request to the model. There, I specified messages labeled with roles to distinguish between system messages and user messages. I made sure to include the context before the most recent user response. I also specified a token limit and temperature to control the length and variation of its response.

Finally, I converted the response to HTML for better formatting and then returned it.

## Capabilities and Limitations

### Capabilities
- Generates a mostly coherent story by using context
- Displays relevant images based on model responses
- Allows the game to refresh while retaining progress (using session storage)
- Shows the chat history for users to review at any time

### Limitations
- The application isn’t currently hosted, so it must be run locally
- It only handles 10 user responses per game, making the gameplay relatively short
- The character creation process relies on the model prompting for information instead of using a form, which is less reliable and makes it more difficult to store player info for future context
- The user must manually initiate the game through chat, which is unnecessary
- Sometimes the model's response is cut off abruptly due to a hard limit on tokens per response

## Next Steps

To continue the project, I would focus on:

1. Converting the character creation into a form
2. Finding a way to better manage the token limit to prevent cut-offs
3. Prompting the model immediatly after the game starts so the player doesn't have to initiate the game
4. Hosting the project