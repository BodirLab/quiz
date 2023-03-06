const catalogs = {
    'allg': 'allg.json'
}

questions2 = {


    catalog: null,

    loadQuestions: function (catalogName) {
        return new Promise((resolve, reject) => {
            const fileName = catalogs[catalogName]
            if (!fileName) {
                reject('unknown catalog')
            } else {
                resolve(fileName)
            }
        })
            .then(fileName => {
                return fetch(fileName)
            })
            .then((res) => {
                return res.json()
            })
            .then((loadedQuestions) => {
                this.catalog = this.toNewFormat(loadedQuestions)
            })
            .then(() => {
                return this
            })
    },

    toNewFormat: function (input) {
        return input.map(question => {
            if ('choice1' in question) {
                // old format detected
                return {
                    question: question.question,
                    answers: ['choice1', 'choice2', 'choice3'].map((choice, index) => {
                        return {
                            text: question[choice],
                            correct: question.answer === index + 1
                        }
                    })
                }
            } else {
                // already in new format
                return question
            }
        })
    },

    getRandomQuestions: function (count) {
        const questions = []
        const catalogCopy = [...this.catalog]
        const numberOfQuestions = Math.min(count, catalogCopy.length)
        for (let i = 0; i < count; i++) {
            const questionIndex = Math.floor(Math.random() * numberOfQuestions)
            questions.push(catalogCopy[questionIndex])
            catalogCopy.splice(questionIndex, 1)
        }
        return questions
    }
}