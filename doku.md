# Inhaltsverzeichnis

# Architektur
Die App besteht aus der Hauptkomponente app.ts sowie folgenden Sub-Komponenten, die die entsprechende Funktionalität bieten. Der Zusammenhang mit dem entsprechenden Service steht rechts neben der Komponente: 

```
app.ts <--> authentication.ts
|-- add-shipment <--> shipment.service
|-- contacts <--> contact.service
|-- label <--> shipment.service
|-- notification <--> notification.service
|-- price <--> shipment.service
|-- stats <--> shipment.service
|-- tracking <--> shipment.service

```
Login und Logout bzw. Weiterleitung auf den Keycloak werden von app.ts bzw. app.html aus gemacht.

# KI-Einsatz
Ich habe ChatGPT (Gratisversion) genutzt; und zwar hauptsächlich zum Debuggen und zum Erklären von Konzepten. In Bezug auf den Code habe ich keinen Code ausschließlich mit KI erstellt, aber auch keine Files völlig ohne KI-Einsatz. Es war mehr eine Art "Zusammenarbeit"; bei Fehlern habe ich die KI um Hilfe gefragt bzw. mir Verbesserungsmöglichkeiten liefern lassen. So ist am Ende der fertige Code entstanden.

# Fragen

# Durchgehendes Testbeispiel und Navigationsweg:

##### Startseite, nicht eingeloggt
![Alt](./screenshots/1.png)

##### Klick auf Login -> Weiterleitung zu lokalem Keycloak und Login
![Alt](./screenshots/2.png)

##### Hauptseite nach Login
![Alt](./screenshots/3.png)

##### Klick auf "Contacts": Kontakte verwalten
![Alt](./screenshots/4.png)

##### Neuen Kontakt anlegen
![Alt](./screenshots/5.png)
![Alt](./screenshots/6.png)

##### Kontakt bearbeiten
![Alt](./screenshots/7.png)

##### Kontakt löschen
![Alt](./screenshots/8.png)

##### Klick auf "Shipment": Neues Shipment anlegen
![Alt](./screenshots/9.png)
![Alt](./screenshots/10.png)

##### Weiterleitung zur Bezahlung
![Alt](./screenshots/11.png)

##### Nach Bezahlung: Tracking-ID und Etikett werden angezeigt
![Alt](./screenshots/12.png)

##### Klick auf "Price": Preis berechnen
![Alt](./screenshots/13.png)

##### Klick auf "Tracking": Historie für Shipment abfragen
![Alt](./screenshots/14.png)

##### Klick auf "Notification": Notifications (de)aktivieren
![Alt](./screenshots/15.png)
![Alt](./screenshots/16.png)

##### Klick auf "Statistics":
![Alt](./screenshots/17.png)


