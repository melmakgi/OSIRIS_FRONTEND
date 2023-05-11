# OSIRIS

## Введение

Osiris (Осирис) - бог возрождения в древнеегипетской мифологии.
Система учета перемещения и продажи труб.
Система состоит из подсистем:

1. Демонтаж труб:
    - вырабтка;
    - вывоз труб на склады;
    - цчет остатков;
2. Склады:
    - учет поступлений на склад;
    - наличия труб на складах;
    - отгрузки контрагенам;
    - остатки на складах;
    - обработка;
3. Продажа труб.

## Особенности

- **Современная разработка**：Разработан на Vue.js 3, Vite 4, Pinia, Axios, Element-Plus
- **TypeScript**: Строго типизированный язык программирования, основанный на JavaScript
- **Тема**: Настройка тем
- **Международный**：Возможность локализации
- **Mock Server** Встроенная схема имитации данных

## Предварительный просмотр

account: **admin/admin test/test**

- `admin` учетная запись используется для имитации разрешения сервера на управление и отображения всего, что возвращает
  сервер
- `test` учетная запись используется для имитации полномочий внешнего управления.

## Документация

В разработке

## Подготовка

- [node](http://nodejs.org/) and [git](https://git-scm.com/) - Project development environment
- [Vite4](https://vitejs.dev/) - Familiar with vite features
- [Vue3](https://v3.vuejs.org/) - Familiar with Vue basic syntax
- [TypeScript](https://www.typescriptlang.org/) - Familiar with the basic syntax of `TypeScript`
- [Vue-Router-Next](https://next.router.vuejs.org/) - Familiar with the basic use of vue-router
- [Element-Plus](https://element-plus.org/) - Familiar with the basic use of element-plus
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs basic syntax

## Установка и использование

- установка зависимостей

```bash
cd osiris_frondend

npm install
```

- run

```bash
npm run dev
```

- build

```bash
npm run build:pro
```

## Change Log

[CHANGELOG](./CHANGELOG.md)

## Поддержка браузеров

`Chrome 80+` браузер рекомендуемый для локальной разрабоики

Поддержка современных браузеров, кроме IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt=" Edge" width="24px" height="24px" />]
(http://godban.github.io/browsers-support-badges/)</br>
IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />]
(http://godban.github.io/browsers-support-badges/)</br>
Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />]
(http://godban.github.io/browsers-support-badges/)</br>
Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />]
(http://godban.github.io/browsers-support-badges/)</br>
Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />]
(http://godban.github.io/browsers-support-badges/)</br>
Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## License

