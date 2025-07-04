# this is a simple example of registering two functions into babyagi, executing the function stored in the database, and loading the dashboard

import babyagi
import os

# Add Mistral API key to enable AI-driven code generation.
babyagi.add_key_wrapper('mistral_api_key', os.environ['MISTRAL_API_KEY'])

@babyagi.register_function()
def world():
    return "world"

@babyagi.register_function(dependencies=["world"])
def hello_world():
    x = world()
    return f"Hello {x}!"

print(hello_world())

@app.route('/')
def home():
    return f"Welcome to the main app. Visit <a href=\"/dashboard\">/dashboard</a> for BabyAGI dashboard."

if __name__ == "__main__":
    app = babyagi.create_app('/dashboard')
    app.run(host='0.0.0.0', port=8080)
