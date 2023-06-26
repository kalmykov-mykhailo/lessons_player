export function fetchLessons(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lessons = [
        {
          title: 'Урок 1',
          subtitle: 'Вступ до програмування',
          video_url: 'https://filmora.wondershare.com/video/product/res_v-temp4.mp4',
          video_time: 11,
          description: [
            'Урок 1: Основи програмування',
            'У цьому уроці ми ознайомимося з основними концепціями програмування.',
            'Вивчимо базові типи даних та їх використання в програмах.',
            'Також розглянемо основні операції змінних та їх використання в умовних конструкціях.',
          ],
        },
        {
          title: 'Урок 2',
          subtitle: 'Робота зі змінними',
          video_url: 'https://filmora.wondershare.com/video/product/res_v-temp1.mp4',
          video_time: 6,
          description: [
            'Урок 2: Змінні та їх типи',
            'На цьому уроці ми детальніше розглянемо роботу зі змінними в мові програмування.',
            'Вивчимо типи даних, такі як числа, рядки, булеві значення та масиви.',
            'Також розглянемо особливості роботи зі змінними різних типів та їх перетворення.',
          ],
        },
        {
          title: 'Урок 3',
          subtitle: 'Умовні конструкції',
          video_url: 'https://filmora.wondershare.com/video/product/res_v-temp6.mp4',
          video_time: 4,
          description: [
            'Урок 3: Умовні оператори та розгалуження',
            'У цьому уроці ми дослідимо умовні конструкції в програмуванні.',
            'Навчимося використовувати умовні оператори, такі як if-else та switch-case.',
            'Також розглянемо розгалуження програми залежно від заданих умов.',
          ],
        },
        {
          title: 'Урок 4',
          subtitle: 'Цикли',
          video_url: 'https://filmora.wondershare.com/video/product/res_v-temp2.mp4',
          video_time: 6,
          description: [
            'Урок 4: Цикли та їх використання',
            'Цикли є потужним інструментом в програмуванні, який дозволяє повторювати виконання певних дій.',
            'На цьому уроці ми розглянемо різні види циклів та їх використання в програмах.',
          ],
        },
        {
          title: 'Урок 5',
          subtitle: 'Функції',
          video_url: 'https://filmora.wondershare.com/video/product/res_v-temp5.mp4',
          video_time: 5,
          description: [
            'Урок 5: Функції в програмуванні',
            'Функції є важливим елементом будь-якої програми.',
            'Ми розглянемо, як створювати та використовувати функції в програмуванні.',
            'Дослідимо різні види функцій та їх параметри.',
          ],
        },
      ];

      resolve(lessons);
    }, 0); // Задержка ответа в миллисекундах (здесь 1000 мс = 1 сек)
  });
}

