# VitoTechnologyTest


## Установка базы данных

Для установки базы данных CouchDB перейдите по ссылке: [Apache CouchDB download](https://couchdb.apache.org/#download "Apache CouchDB download") и скачайте Apache CouchDB для вашей операционной системы. Затем следуя указаниям, размещенным на сайте Apache CouchDB, установите базу данных.


## Клонирование репозитория

Для клонирования репозитория выполните команду `git clone https://github.com/Horrorspace/VitoTechnologyTest`.


## Установка зависимостей

1. Выполните команду `cd VitoTechnologyTest`, чтобы перейти в папку с приложением.
2. Выполните команду `npm install`, чтобы установить зависимости.


## Настройка базы данных

1. Создайте файл, который называется `.production.env`, и содержит следующие переменные:
* PORT - номер порта на котором будет запущено приложение;
* DB_PROTOCOL - протокол вашей базы данных (http или https);
* DB_HOST - адрес вашей базы данных (например localhost);
* DB_PORT - номер порта на котором запущена база данных;
* DB_USERNAME - логин для подключения к вашей базе данных;
* DB_PASSWORD - пароль для подключения к вашей базе данных;
2. Выполните команду `npm run createDB`.


## Сборка приложения в режиме разработки

1. Создайте файл, который называется `.development.env`, и содержит следующие переменные:
* PORT - номер порта на котором будет запущено приложение;
* DB_PROTOCOL - протокол вашей базы данных (http или https);
* DB_HOST - адрес вашей базы данных (например localhost);
* DB_PORT - номер порта на котором запущена база данных;
* DB_USERNAME - логин для подключения к вашей базе данных;
* DB_PASSWORD - пароль для подключения к вашей базе данных;
2. Выполните команду `npm run dev` чтобы собрать приложение в режиме разработки. После чего будет запущена сборка в режиме наблюдения.


## Сборка приложения

Для сборки приложения выполните команду `npm run build`.


## Запуск приложения в режиме разработки

Для запуска приложения в режиме разработки выполните команду `npm run serve`. После чего приложение будет запущено в режиме наблюдения на порту указанном в `.development.env` файле.

Откройте `http://localhost:${YOUR_PORT_NUMBER}/graphql` в вашем бразуере, чтобы увидеть GraphQL песочницу.


## Запуск приложения

Чтобы запустить приложение выполните команду `npm start`. После чего приложение будет запущено на порту указанном в `.production.env` файле.