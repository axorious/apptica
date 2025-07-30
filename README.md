# Apptica Top History Widget

Виджет для отображения истории позиций приложения в различных категориях за выбранный период времени.  
Реализован на React, Redux, Redux Thunk и Chart.js.  
Проект адаптивен и поддерживает выбор страны, категории и скрытие/отображение линий на графике.

## Возможности

- Загрузка списка стран и категорий с API Apptica
- Загрузка и отображение истории позиций приложения по дням (график)
- Переключение страны и категорий с мгновенной подгрузкой данных
- Возможность скрывать/показывать линии каждой категории на графике
- Адаптивный дизайн (min-width: 375px)
- Заглушка при отсутствии данных

## Технологии

- React 19
- Redux, redux-thunk
- Chart.js 4
- SCSS (Sass)
- Vite

## Структура проекта

```
src/
  api/                // API-запросы к Apptica
  components/         // React-компоненты (виджет, график, селекторы)
  selectors/          // Redux-селекторы
  store/              // Redux-редьюсеры и экшены
  style/              // SCSS-стили
  App.jsx             // Корневой компонент
  main.jsx            // Точка входа
```

## Основные файлы

- [`src/components/TopHistoryWidget.jsx`](src/components/TopHistoryWidget.jsx) — основной виджет
- [`src/components/TopHistoryChart.jsx`](src/components/TopHistoryChart.jsx) — график с легендой
- [`src/components/CountrySelector.jsx`](src/components/CountrySelector.jsx) — селектор страны с иконкой
- [`src/components/CategorySelector.jsx`](src/components/CategorySelector.jsx) — селектор категорий
- [`src/style/App.scss`](src/style/App.scss) — все стили проекта

## API

- Список стран:  
  `https://api.apptica.com/v1/geo?...`
- Список категорий:  
  `https://api.apptica.com/v1/applicationCategory?...`
- История позиций:  
  `https://api.apptica.com/package/top_history/9379/{countryId}?date_from={dateFrom}&date_to={dateTo}&platforms=1&...`

## Примечания

- Для корректной работы требуется интернет-доступ к API Apptica.
- Если для выбранной страны или категории нет данных, отображается заглушка.
- Для отображения иконок стран используется поле `icon` из ответа API.

---

**Автор:**  
[axorious]
