import babyagi
import os


app = babyagi.create_app('/dashboard')

# Add Mistral API key to enable AI-driven code generation.
babyagi.add_key_wrapper('mistral_api_key', os.environ['MISTRAL_API_KEY'])


@app.route('/')
def home():
    return f"Welcome to the main app. Visit <a href=\"/dashboard\">/dashboard</a> for BabyAGI dashboard."

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
