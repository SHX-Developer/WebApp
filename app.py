from flask import Flask, render_template, request

app = Flask(__name__)

# Проверка: является ли устройство мобильным
def is_mobile():
    ua = request.headers.get('User-Agent', '').lower()
    return any(x in ua for x in ['iphone', 'android', 'ipad', 'mobi'])

@app.route('/')
def index():
    if is_mobile():
        return render_template('index.html')
    else:
        return render_template('desktop_block.html')

if __name__ == '__main__':
    app.run(debug=True)
