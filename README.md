#Poder Judicial Neuquén

App para el concurso externo Expediente Nº 0578-22

#Ejercicio de App en java con Hilla + React

Una app aplicación de ejercicio desarrollada en Java, utilizando el framework Hilla con Spring Boot y React. 

#Para comenzar

Puedes clonar este proyecto desde GitHub usando el siguiente comando:

git clone https://github.com/hectorjaviermella/repositorioTPPoderJudicial


#Correr la aplicacion

El proyecto es un proyecto Maven. Para ejecutarlo desde la línea de comandos, tipear mvnw (Windows), o ./mvnw (Mac & Linux), y luego abrir http://localhost:8080 en el navegador. Esto requiere tener Maven instalado.


Deploying a Producción

Para crear una compilación de producción, ejecutar mvnw clean package -Pproduction (Windows), o ./mvnw clean package -Pproduction (Mac & Linux). Esto creará un archivo JAR con todas las dependencias y recursos front-end, listo para ser desplegado. El archivo se puede encontrar en la carpeta target después de que se complete la compilación. Una vez que se construye el archivo JAR, se puede correr usando java -jar tppj-hilla-1.0-SNAPSHOT.jar (el mismo se adjunta por email).



#Información de la App

Edificio: Permite crear, modificar y eliminar edificios.

Dependencia: Permite crear, modificar y eliminar dependencias.

En ambos casos, se muestran datos de edificios y dependencias ya cargados, se utilizó una base de datos en memoria.

##Estructura del Proyecto



## Estructura del Proyecto

<table style="width:100%; text-align: left;">
  <tr><th>Directory</th><th>Description</th></tr>
  <tr><td><code>frontend/</code></td><td>Client-side source directory</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>index.html</code></td><td>HTML template</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>index.ts</code></td><td>Frontend 
entrypoint, bootstraps a React application</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>routes.tsx</code></td><td>React Router routes definition</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>MainLayout.tsx</code></td><td>Main 
layout component, contains the navigation menu, uses <a href="https://hilla.dev/docs/react/components/app-layout">
App Layout</a></td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>views/</code></td><td>UI view 
components</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>themes/</code></td><td>Custom  
CSS styles</td></tr>
  <tr><td><code>src/main/java/&lt;groupId&gt;/</code></td><td>Server-side 
source directory, contains the server-side Java views</td></tr>
  <tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<code>Application.java</code></td><td>Server entry-point</td></tr>
</table>

## Useful links

- Read the documentation at [hilla.dev/docs](https://hilla.dev/docs/).
- Ask questions on [Stack Overflow](https://stackoverflow.com/questions/tagged/hilla) or join our [Discord channel](https://discord.gg/MYFq5RTbBn).
- Report issues, create pull requests in [GitHub](https://github.com/vaadin/hilla).
