import TelegramBot from 'node-telegram-bot-api' // подключаем node-telegram-bot-api

const token = '2118229494:AAGXq4dXwZYPoKiOoaCjzuoK1sr__UP-KR4'; // тут токен кторый мы получили от botFather

// включаем самого обота
const bot = new TelegramBot(token, {polling: true});

//конфиг клавиатуры
const keyboard = [
    [
        {
            text: 'Хорошая новость!', // текст на кнопке
            callback_data: 'good_news' // данные для обработчика событий
        }
    ],
    [
        {
            text: 'Супер пупер хорошая новость!',
            callback_data: 'super_good_news'
        }
    ],
];

import express from 'express'
const app = express()
const PORT = 3000

bot.setMyCommands([
    {command: 'start', description: 'начальная команда'},
    {command: 'info', description: 'узнать имя'},
    {command: 'game', description: 'Играть'},
])

// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
    const text = msg.text
    const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

    if (text === '/start') {
        // отправляем сообщение
        bot.sendMessage(chatId, 'Добро пожаловать!');
    }
    else if (text === '/game') {
        // отправляем сообщение
        bot.sendMessage(chatId, `game!`);
    }

    else if (text === '/info') {
        // отправляем сообщение
        bot.sendMessage(chatId, `Привет, ${msg.from.first_name}!`);
    }
    else {
        // отправляем сообщение
        bot.sendMessage(chatId, 'Привет, Друг! Жми быстрее!', { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
});

// обработчик событий нажатий на клавиатуру
bot.on('callback_query', async query => {
    const chatId = query.message.chat.id;

    let img = '';
    let message = ''

    if (query.data === 'good_news') { // если кот
        img = 'bot.jpg';
        message = 'Я научился создавать Бота!'
    }

    if (query.data === 'super_good_news') { // если пёс
        img = 'welcome.jpg';
        message = 'Мы очень рады что вы теперь с нами ☺️😊😀'
    }

    if (img) {
        await bot.sendPhoto(chatId, img);
        await bot.sendMessage(chatId, message);
    } else {
        await bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', {
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
});
app.get('/', (req, res) => {
    res.send('Hello debug_Yourself')
})
app.listen(PORT, () => console.log(`My server is running on port ${PORT}`))
