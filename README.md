# Mi Dulce Espera

**Mi Dulce Espera** es una aplicación web progresiva (PWA) open source para el seguimiento personalizado del embarazo, desarrollada con React, TypeScript y Vite. Ofrece mensajes motivacionales y apoyo emocional generados por IA, información semanal sobre el desarrollo del bebé, y una experiencia moderna, privada y accesible desde cualquier dispositivo

### Características
- **Seguimiento semana a semana** del embarazo, con hitos y cambios importantes.
- **Mensajes motivacionales y de apoyo** generados por IA, personalizados según la etapa y el estado de ánimo.
- **Información científica y accesible** sobre el desarrollo fetal.
- **Gráficas de crecimiento** y visualización del tamaño del bebé.
- **PWA**: Instalable en dispositivos móviles, funciona offline y con notificaciones.
- **Privacidad**: Todos los datos se almacenan localmente en el dispositivo del usuario.
- **SEO y accesibilidad** optimizadas.
- **Interfaz moderna** con Tailwind CSS.

### Demo
Accede a la [demo aquí](https://sweet-hope.netlify.app)

### Instalación
1. Clona el repositorio:
  ```
  git clone https://github.com/SvS30/sweet-hope.git
  cd sweet-hope
  ```
2. Instala las dependencias:
  ```
  npm install
  ```
3. Crea un archivo .env con tus claves de Supabase
4. Inicia el servidor de desarrollo: `npm run dev`

### Uso
- Abre la app en tu navegador en http://localhost:5173.
- Configura tu seguimiento ingresando la fecha de tu última menstruación y, opcionalmente, tu nombre y el de tu bebé.
- Explora las pestañas: Inicio, Desarrollo, Crecimiento y Apoyo.
- Instala la app en tu dispositivo móvil para una experiencia nativa.

### Arquitectura
- **Frontend**: React + TypeScript + Vite
- **Estado global**: Redux Toolkit
- **Estilos**: Tailwind CSS
- **Backend serverless**: Supabase Functions (para generación de contenido IA)
- **Integración IA**: Hugging Face API (DialoGPT-medium)
- **PWA**: Manifest, Service Worker, instalación y soporte offline

### Contribuir
¡Las contribuciones son bienvenidas! Por favor, abre un issue o pull request para sugerencias, mejoras o correcciones.

1. Haz un fork del repositorio.
2. Crea una rama para tu feature/fix: `git checkout -b mi-feature`
3. Realiza tus cambios y haz commit: `git commit -am 'Agrega mi feature'`
4. Haz push a tu rama: `git push origin mi-feature`
5. Abre un Pull Request.

### Licencia
MIT © 2025 Salim Vazquez Solis