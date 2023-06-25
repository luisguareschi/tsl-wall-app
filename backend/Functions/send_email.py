import smtplib
from email.mime.text import MIMEText


def send_email(subject, body, sender, recipients, password):
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = ', '.join(recipients)
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
        smtp_server.login(sender, password)
        smtp_server.sendmail(sender, recipients, msg.as_string())


def send_welcome_email(user_email):
    subject = "Welcome to the TSL Wall"
    body = f"Hello {user_email}, welcome to the TSL Wall.\n\n" \
           f"Here you can share your thoughts with the world.\n\n" \
           f"Enjoy!\n\n"
    sender = "guareschiluis@gmail.com"
    recipients = [user_email]
    password = "mmxpjoadgustzydi"
    send_email(subject, body, sender, recipients, password)


if __name__ == '__main__':
    subject = "Email Subject"
    body = "This is the body of the text message"
    sender = "guareschiluis@gmail.com"
    recipients = ["luisguareschi@hotmail.com"]
    password = "mmxpjoadgustzydi"

    send_email(subject, body, sender, recipients, password)
