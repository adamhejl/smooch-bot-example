'use strict';

const Script = require('smooch-bot').Script;

const scriptRules = require('./script.json');

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Simply Wall St Coffee bot!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Great! I'll call you ${name}`))
                .then(() => 'askCoffee');
        }
    },
    
        askCoffee: {
        prompt: (bot) => bot.say('So ${name}, do you want coffee today?'),
        receive: (bot, message) => {
            const email = message.text;
            return bot.setProp('email', email)
                .then(() => bot.say(`Cool! I'll ping you at ${email} if there are any problems`))
                .then(() => 'finish');

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, Adam is too lazy and didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'finish');
        }
    }
});
