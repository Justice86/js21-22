$(document).ready(() => {
    let database = {
        questions: [
            {
                title: 'Вопрос №1',
                radioname: 'one',
                id: ['1', '2', '3'],
                answers: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
                correct: 1
            },
            {
                title: 'Вопрос №2',
                radioname: 'two',
                id: ['1', '2', '3'],
                answers: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
                correct: 2
            },
            {
                title: 'Вопрос №3',
                radioname: 'three',
                id: ['1', '2', '3'],
                answers: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
                correct: 3
            }
        ]
    };

    localStorage.setItem('test', JSON.stringify(database));

    let data = JSON.parse(localStorage.getItem('test'));

    let html = $('#test').html();
    let content = tmpl(html, data);
    $('body').append(content);


    function showModal(e) {
        e.preventDefault();

        let modal = $('<div class="modal"></div>');
        let result = 0;
        let answer = $('input:checked');
        let correct = [];

        for (let i = 0; i < data.questions.length; i++) {
            correct[i] = data.questions[i].correct;
            if ($(answer[i]).attr('id') == correct[i]) {
                result += 1;
                modal.append('<p class="correct">Ответ на ' + (i + 1) + ' вопрос правильный</p>');
            } else {
                modal.append('<p class="incorrect">Ответ на ' + (i + 1) + ' вопрос неправильный</p>');
            }
        }

        modal.append('<button>Закрыть и начать заново</button>');
        $('body').append(modal);

        $('button').one('click', function (e) {
            e.preventDefault();
            modal.detach();
            $('input').attr('checked', false);
        })
    }

    $('button').on('click', showModal);

});
