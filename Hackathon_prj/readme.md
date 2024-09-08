# Hackathon_prj Setup

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/Suhaniyaarrr/SIH.git
    cd Hackathon_prj
    ```

2. Create the `.env` file:
    Copy the `.env.template` file and rename it to `.env`:
    ```bash
    cp .env.template .env
    ```

3. Add your API keys:
    Open the `.env` file and add your own OpenWeatherMap API key and other sensitive information:
    ```bash
    OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here
    SECRET_KEY=your_django_secret_key
    ```

4. Run the project:
    Install dependencies and run the development server:
    ```bash
    pip install -r requirements.txt
    python manage.py runserver
    ```

## Requirements

- Python 3.x
- Django 3.x+
