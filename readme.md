# Opis projektu

Celem projektu jest stworzenie prostej aplikacji webowej,
która umożliwi przeglądanie najnowszych newsów
związanych z kosmosem. Apikacja będzie umożliwiała
także zapisywanie ulubionych artykułów, oraz dodawania
do nich swoich notatek. Ulubione notatki będzie można
etykietować w celu łatwiejszego ich wyszukiwania.

# Podstawowe funkcjonalności

- [x] przeglądanie artykołów
  - [x] lista artykółów
  - [x] szczegóły artykółów
  - [x] filtrowanie artykółów
- [x] dodawanie artykółu do ulubioncyh
- [x] dodawanie notatek do ulubionego artykułu
- [ ] dodawanie etykiet do ulubionego artykułu
- [x] dostęp do ulubionych artykolow w trybie offline

# Używane technologie

- [React.js](https://pl.reactjs.org/) - Biblioteka frontendowa
- [MaterialUI](https://mui.com/) - Design system implemetujący material design. Zaprojektowany od podstaw dla reacta
- [Redux](https://redux.js.org/) - Biblioteka do zarządaniem stanem aplikacji. Bibiloteka użyta tylko w celu praktyki. Nie ma ona tutaj większego sensu. 
- [GitHub](https://github.com/) - Zdalne repozytorium wersji
- [Azure Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/#overview) - umożliwi bezpośredni deployment aplikacji z repozytorium github
- [PWA](https://web.dev/progressive-web-apps) - ta technologia umożliwi nam na instalacjię aplikacji na smartfonach. Tylko, żeby spełnić wymagania labolatorium i nie bawić się Javą.
- [Dexie.js](https://dexie.org/) - wrepper umoiwiajcy łatwiejszą pracę z wbudowaną w przeglądarkę bazą indexedDB
