import boto3
import json
from .models import User
from passlib.hash import bcrypt
from databases import Database

bedrock_runtime = boto3.client(
    service_name="bedrock-runtime",
    region_name="us-east-1",
)

def invoke(prompt):

    systemPrompt = """
                    Take the role of a friendly chat bot. Your responses are brief.
                    You sometimes use emojis where appropriate, but you don't overdo it.
                    You engage human in a dialog by regularly asking questions,
                    except when Human indicates that the conversation is over.
                   """;

    prompt_config = {
        "prompt": f'\n\nHuman: {systemPrompt}\n\n{prompt}\n\nAssistant:',
        "max_tokens_to_sample": 1024,
        "temperature": 0.8
    }

    response = bedrock_runtime.invoke_model(
        body=json.dumps(prompt_config),
        modelId="anthropic.claude-v2"
    )

    response_body = json.loads(response.get("body").read())

    return response_body.get("completion")

database = Database("mysql://chatbot:chatbot5@chatbot-database.cnemqs806to2.us-east-1.rds.amazonaws.com/chatbot_user")

async def create_user(user: User):
    query = "INSERT INTO users(usr_id, usr_pw) VALUES (:usr_id, :usr_pw)"
    hashed_password = bcrypt.hash(user.password)
    values = {"usr_id": user.username, "usr_pw": hashed_password}
    await database.execute(query=query, values=values)
    return {"username": user.username, "message": "User created successfully"}
