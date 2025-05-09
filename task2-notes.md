# Задание 2

В соответствии с представленной схемой в системе имеются следующий функционал.
Разбил на доменные группы и привел пояснительные комментарии возле спорных. 

## Регистрация, авторизация, аутентификация пользователей
1. Регистрация пользователя (заведение учетной записи в системе)
2. Аутентификация
3. Валидация токена безопасности (например, если сервисы ходят через JWT)

## Учетные записи
1. Присвоение ролей (назначение типа пользователю: покупатель, продавец, правовой статус: юр.лицо, физ.лицо, гос.представитель)

## Уведомления
1. Нотификация нового пользователя (уведомление по email о регистрации)
2. Нотификация об изменении состояния заказа (уведомление по email о том, что заказ изменил статус: новый, сборка, транспортировка, готов к выдаче)
3. Нотификация участника аукциона (уведомление по email о том, что аукцион состоялся или ставка была перебита)

## Заказы
1. Создание заказа (типовая покупка товара или услуги, например как в интернет магазинах)
2. Редактирование заказа (изменение заказа на случай, если нужно добавить/удалить товар или услугу)
3. Сохранение заказа (предварительное сохранение информации о заказе до размещения)
4. Подтверждение заказа (подтверждение поставщиком факта того, что все товары/услуги есть в наличии и заказ готов к сборке)
5. Размещение заказа (отправка заявки на приобретение товара/услуги у постащика)
6. Отобразить все заказы (список всех заказов)
7. Отобразить детали заказа (детали конкретного заказа)

## Товары и услуги
1. Удалить услугу пользователя (удаление услуги из продаваемых)
2. Удалить товар пользователя (удаление товара из продаваемых)
3. Добавить товар в профиль пользователя (добавление товара для последующей продажи)
4. Добавить услугу в профиль пользователя (добавление услуги для последующей продажи)
5. Изменить товар пользователя
6. Изменить услугу пользователя
7. Поиск товаров (типовой функционал поиска среди всех товаров по категориям, ключевым словам)
8. Поиск услуг (типовой функционал поиска среди всех услуг по категориям, ключевым словам)
9. Фильтрация и сортировка результатов

## Интеграция с внешими платежными системами 
1. Определить способ оплаты (какой внешний сервис будет использоваться для оплаты)
2. Инициировать платёжную операцию (отправить запрос на внешний сервис для оплаты товара/услуги)
3. Учёт платёжной операции (сохранение в базе данных информации о платеже)
4. Авторизация платёжной операции (проверка и подтверждение платежной системой возможности проведения транзакции)
5. Предоставить список и статус операций (непонятно для чего, если есть п.8)
6. Инициировать отмену транзакции (в случае если пользователь решил отменить покупку через внешний сервис)
7. Запросить статус операции (запрос у внешнего платежного сервиса факта оплаты)
8. Предоставить статус операции (отправка из внешнего сервера сведений об оплате)

## Аукционы
1. Создать аукцион (могут только пользователи определенной роли)
2. Редактировать аукцион (могут только пользователи определенной роли)
3. Обработать новую заявку на аукцион (подразумевается валидация со стороны администрации сервиса)
4. Обновление ставок аукциона (выполняется участниками аукциона)
5. Обновление статуса аукциона

## Аппеляции
1. Создать заявку на апелляцию (выполняется участниками аукциона в случае несогласия с результатами)
2. Регистрация заявки на апелляцию (выполняется участниками аукциона в случае несогласия с результатами)
3. Обновить статус заявки на апелляцию (выполняется после принятия решений администраторами)

## Отчетность
1. Сгенерировать отчёт по продажам (выполняется пользователями с определенной ролью)
2. Отобразить статистику заказов (может быть у всех пользователей)

## Техподдержка
1. Создать заявку на техподдержку
2. Регистрация заявки на техподдержку
3. Обновление статуса заявки

## Аудит активности пользователей
1. Сгенерировать отчёт активности пользователей

## Разделение на микросервисы

### Микрофронтенды

1. Микрофронтенд авторизации, аутентификации и управления учетными записями

2. Микрофронтенд аукционов

3. Микрофронтенд товаров и услуг

4. Микрофронтенд заказов

5. Микрофронтенд аппеляций

6. Микрофронтенд тикетов (для технической поддержки)

7. Микрофронтенд администрирования

Стоит дополнительно отметить, что используется подход Module Federation для объединения микрофронтендов.

### Микросервисы серверной части

1. Сервис авторизации, аутентификации и управления учетными записями
Не зависит от других сервисов.
К примеру, можно использовать Keycloak. 
Возможно горизонтальное масштабирование.
Своя СУБД для сервиса.
Сервис взаимодействует с сервисом уведомлений напрямую для рассылки информации о регистрации учетной записи.

2. Сервис заказов
Сервис заказов может быть узким местом в архитектуре, т.к. операции с заказами довольно частые.
Поэтому имеет смысл масштабирование и наличие своей собственной СУБД.
Сервис взаимодейстует с:
- сервисом каталогов и услуг для запроса данных (напрямую)
- сервиом платежей для актуализации статуса операции (через Apache Kafka).

3. Сервис уведомлений
Сервис уведомлений отвечает за рассылку сообщений пользователям по email в связи с различными событями.
Здесь не кажется наличие большой нагрузки т.к. сообщения могут вставать в очередь.
А для мониторинга состония статуса аукциона этот инструмент не следует использовать, 
т.к. просмотр в реальном времени через веб-сайт даст более актуальный ответ.
Своя СУБД для сервиса.
Сервис взаимодействует с:
- сервисом заказов через Apache Kafka для рассылки изменений статусов заказов
- сервисом через Apache Kafka для рассылки изменений информации об аукционе.

4. Сервис обработки платежей
Сервис отвечает за интеграцию с внешними платежными системами и обработку платежных операций.
Не уверен точно, нужна ли своя СУБД, т.к. возможно, что сервис заказов уже хранит эти сведения.
В случае, если логика обработки платежей внешних сервисов сложная или часто меняется, 
то возможна декомпозиция этого сервиса на несколько отдельных под каждый конкретный внешний сервис платежей. 

5. Сервис каталога товаров и услуг
Сервис отвечает за товары и услуги, а также всех операций с этими сущностями.
Не стоит их разделять, т.к. они достаточно близки.
Также как и сервис заказов может быть узким местом, т.к. пользователи могут часто запрашивать каталог и сведения о товарах и услугах.
Должен масштабироваться и желательно иметь слой кэширования.
Своя СУБД.

6. Сервис аукционов
Сервис критичный по времени отклика и требующий высокой доступности.
Т.к. аукционы часто проходят в режиме реального времени - сервис должен работать без задержек.
Должен масштабироваться.
Взаимодействует с сервисом уведомлений для почтовой рассылки через Apache Kafka.
Своя СУБД.

7. Сервис генерации отчетности по заказам и продажам
Сервис генерации отчетов должен генерировать отчеты для различных ролей пользователей.
Для этого подразумевается общение с другими соответствующими сервисами либо получение логов аудита через единый сервис логов.
Т.к. отчеты могут быть в разных форматах (pdf, json, xml, txt и т.д.) работа с отчетами вынесена в отдельный домен и микросервис.
В данной архитектуре предполагается, что каждый микросервис на уровне кода использует общие библиотеки для аудита и за счет
этого обеспечивается единообразие в логировании действий пользователей. Благодаря этому появляется возможность через фильтр получить 
требуемые логи через стек Grafana, Tempo, Logstash и сформировать на основе этого отчет.

8. Сервис тикетов технической поддержки
Отдельный микросервис для поддержки клиентов.
Своя СУБД.

9. Сервис аппеляций
Сервис для регистрации заявок на оспаривание результатов аукциона.
Вынесен отдельно в соответствии с DDD.

10. Система для потоковой обработки данных (Apache Kafka)

11. Grafana, Tempo, Logstash
Был также добавлен стек: Grafana, Tempo, Logstash - для трассировок, мониторинга и логирования.


## Взаимодействие между микросервисами

Микросервисы должны взаимодействовать асинхронно посредством Event-Driven Architecture.
Предлагается использование Apache Kafka для обеспечения хореографии. 
Это означает, что:
- между микросервисами слабая связанность
- легкая масштабируемость
- легкое подключение новых сервисов
- обеспечивается отказоустойчивость.
