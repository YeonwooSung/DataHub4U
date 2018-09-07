<img width="217" alt="main_logo" src="https://user-images.githubusercontent.com/30489717/45232236-af2f7280-b309-11e8-866a-e95c322eb398.png">


## Overview

The DataHub4U helps you to collect data and analyse the collected data.
It detects the temperature and the humidity of the place where device the device is.
Then, it sends the collected temperature and humidity to the server via network.


![datahub4u-1](https://user-images.githubusercontent.com/30489717/44945514-37070f80-ae26-11e8-8f5a-f5ddb41abdd7.png)


To collect the data, I used the ESP8266. It sends the collected data via network, and the server stores the data in the SQL Database.



## Visualising the data dynamically

The main aim of the DataHub4U is collecting the data and visualising the collected data in the real time.
By using the Google Line Chart API, we visualise the collected data.
You could see the trend of the temperature change and the humidity change easily through the graph.


<img width="1263" alt="screenshot_of_datapage_prototype" src="https://user-images.githubusercontent.com/30489717/44899708-74dc3900-ad3d-11e8-8502-c450bd5f4746.png">


The image above is the screenshot of the temperature graph.
You could see that there are 6 links on the graph.
By clicking one of those links, you could set the date range of your data graph.

Initially, the server will send the data within 24 hours, thus, the application does not require the additional communication for the 5 hours graph, 12 hours graph, and 1 day graph.
However, if you want to draw the 1 week or 1 month graph, or if you want to customize the date range of the line graph, the application will do the AJAX communication.
If the AJAX communication success, the graph that you wanted to draw will appear.
Otherwise, you will be failed to draw a graph.



## To Do List

1. Alert when the current temperature or humidity is too high or too low.
2. Update the device from ESP8266 to ESP32
3. Convert the error page thing to something else!! (It will gonna make an error on the Web App)



<img width="221" alt="sub_logo" src="https://user-images.githubusercontent.com/30489717/45232378-2ebd4180-b30a-11e8-9ebc-75e7b418f9c5.png">


## License

### Apache License


Things that you could do with this repository:

    1) Commercial use

    2) Modification

    3) Distribution

    4) Patent Use

    5) Private Use


Things that you "MUST NOT" do with this repository:

    1) Trademark use

    2) Liability

    3) Warranty


The copyright of the DataHub4U is on Yeonwoo Sung.