from gtts import gTTS
import os

text = """
Welcome to Gravity Health. Experience the future of healthcare with our zero-friction platform.
Powered by modern web technologies, we bring you a seamless interface that feels alive.
Booking an appointment has never been this fast. Just one click to start.
Select your department and choose from our world-class specialists instantly.
Pick a time that works for you, confirm, and you're done. Gravity Health: Healthcare, simplified.
"""

# Language: English
language = 'en'

# Slow: False
myobj = gTTS(text=text, lang=language, slow=False)

# Saving the converted audio in a mp3 file named
output_file = "public/demo_voiceover.mp3"
os.makedirs("public", exist_ok=True)
myobj.save(output_file)

print(f"Audio saved to {output_file}")
