Proyecto Turnero
Inicio: 14/4/2026
1. Tabla de contenidos
Introducción
Alcance del Producto
Propuesta de Valor
Audiencia Objetivo
Uso previsto y Roles
Definiciones y Acrónimos
Requerimientos Funcionales
Arquitectura del Sistema




Introducción
Este proyecto nace por la búsqueda de solucionar la gestión de citas y turnos para comercios de diversos rubros, como por ejemplo barberías, tatuadores, dentistas, salones de belleza, etc. Está hecha para captar al cliente con una aplicación que le facilite la tarea de agendar un turno con una aplicación llamativa visualmente y que se pueda informar de precios y fechas disponibles, que además, sea de utilidad para la persona que brinda dichos servicios para que lo pueda realizar de una manera sencilla, que brinde estadísticas y diversas funcionalidades que, en el dia a dia, terminan ayudando a concretar los turnos y a gestionar de manera correcta la operatividad del negocio o local. La audiencia objetivo serían pequeñas barberias con no muchas sucursales, locales de belleza, negocios donde se brinde un servicio repetitivo que dependa de turnos como por ejemplo un salón de uñas.

Visión y Propósito
El objetivo es reducir el no-show (clientes que no asisten) mediante la confirmación por email y centralizar la agenda en una interfaz intuitiva. La visión de este proyecto se basa en democratizar el acceso a herramientas de gestión y análisis de datos para pequeños comercios de servicios, estudios y salones independientes. Aspiramos a ser el motor tecnológico invisible que permita a estos emprendedores profesionalizar su imagen, ofreciendo a sus clientes una experiencia de reserva moderna, atractiva y sin fricciones, compitiendo al mismo nivel de atención digital que las grandes franquicias.
Este proyecto nace de una convicción personal y de la observación de mi entorno local: la tecnología debe servir para aliviar el trabajo diario, no para abrumar con funciones innecesarias. Como desarrollador independiente, he visto cómo plataformas consolidadas resultan frías, costosas y complejas para el dueño de una barbería o un salón de uñas. Mi propósito es construir un puente técnico mediante un SaaS ágil y cercano, enfocado en erradicar dolores reales como la pérdida de ingresos por el ausentismo (no-shows). Al diseñar esta solución desde cero, mi meta no es solo entregar software, sino devolverle al comerciante su recurso más valioso: el tiempo y la tranquilidad mental para enfocarse exclusivamente en el arte de su negocio.



Alcance del Producto
Objetivo General: Desarrollar una plataforma SaaS multi-tenant que automatice el ciclo de vida de una reserva, desde la visualización de disponibilidad hasta la confirmación y el análisis de datos.
Objetivos Específicos:
Digitalizar la agenda de comercios de servicios, eliminando el error humano.
Reducir el ausentismo mediante un sistema de validación por correo electrónico.
Proveer herramientas de análisis para la toma de decisiones basadas en datos.
Beneficios:
Para el Comercio: Ahorro de tiempo administrativo y visibilidad clara de la rentabilidad diaria/mensual.
Para el Cliente: Comodidad de reserva 24/7 sin necesidad de llamadas telefónicas.

Valor del Producto
Este producto resuelve el problema de la operatividad caótica en negocios que dependen de turnos manuales (WhatsApp o cuadernos) o directamente por orden de llegada. El valor reside en la profesionalización del servicio: un salón que ofrece una web de reservas transmite mayor confianza y modernidad. Además, soluciona la pérdida de ingresos por citas olvidadas, actuando como un asistente administrativo virtual que nunca duerme y gráficos estadísticos para seguimiento del rendimiento.
Audiencia Objetivo
El diseño (UI/UX) debe ser Mobile-First, ya que tanto el dueño del local como el cliente operarán mayormente desde dispositivos móviles.
Dueños de PyMEs de servicios: Personas de 18 a 50 años que buscan eficiencia pero no son necesariamente expertos en tecnología. La interfaz debe ser limpia y no intimidante.
Clientes Finales: Usuarios modernos que valoran la inmediatez y el diseño visual atractivo eficiente. Usuarios que lidian con la tarea manual de agenda y seguimiento de estadísticas o que ni siquiera tienen esto en cuenta.

Uso previsto por Rol
Rol Administrador (Dueño del local):
Configurar horarios de apertura, servicios y precios.
Definir si un servicio requiere confirmación vía email.
Crear, eliminar, modificar y asignar empleados (Asignar turno).
Darle servicios fijos a empleados.
Gestionar el calendario (bloquear días, mover turnos, cancelar turnos).
Visualizar tableros (dashboards) con métricas: "Servicio más solicitado", "Horas pico", "Ingresos estimados".
Rol Cliente:
Navegar por el catálogo de servicios.
Seleccionar fecha y hora basándose en la disponibilidad real del sistema.
Recibir y confirmar su turno mediante un enlace único enviado a su email.
Recibir un recordatorio vía whatsapp con la información correspondiente al turno solicitado.
Glosario de Términos
SaaS (Software as a Service): Modelo de software donde el negocio paga una suscripción por usar la plataforma.
Multi-tenancy: Arquitectura donde una sola instancia del software sirve a múltiples clientes (comercios), manteniendo sus datos aislados.
Slot: Franja horaria mínima disponible para una reserva (ej. 30 minutos).
No-Show: Término de la industria para referirse a un cliente que reserva pero no se presenta.
MVP (Minimum Viable Product): Versión inicial con las funciones básicas para salir al mercado.
UI/UX: Interfaz de Usuario y Experiencia de Usuario, respectivamente.

Requerimientos Funcionales
Módulo de Configuración (Administrador):
RF1: El sistema debe permitir al administrador definir los horarios de apertura, cierre y días no laborables del comercio.
RF2: El administrador debe poder crear, editar y eliminar "Servicios", especificando su duración en minutos y precio (ej. Corte de Pelo, 45 min, $5000).
RF3: el administrador debe poder dar de alta, modificar, eliminar y asignar Turnos y/o Servicios a  “Empleados“.
RF4: el sistema debe mostrar gráficos estadísticos de servicios más solicitados, horas y días pico, recaudación diaria y mensual.
RF5: el sistema debe permitir al administrador indicar en el calendario días que por motivos diversos no se va a trabajar.
Módulo de Motor de Reservas (Cliente Final):
RF6: El sistema debe mostrar todos los servicios disponibles, precios y en caso de tener varios empleados que puedan realizar este servicio, mostrar su información básica.
RF7: El sistema debe calcular y mostrar dinámicamente los "Slots" (turnos) disponibles, ocultando automáticamente aquellos que ya estén ocupados o bloqueados.
RF8: Al solicitar un turno, el sistema generará una reserva en estado Pendiente y enviará un token por email.
RF9: El sistema debe mostrar la ubicación del local mediante una API de Google o similar.

Módulo de Pagos y Retención (Opcional):
RF10: El sistema debe integrarse con la API de MercadoPago para requerir el pago de una seña (porcentaje del precio total) antes de pasar la reserva a estado Confirmada.
Gestión de Identidad y Multi-tenant (IAM): Corregir formato de lista
RF11: El sistema debe permitir el registro de un nuevo Comercio (Tenant), aislando lógicamente sus datos del resto.
RF12: Autenticación basada en tokens JWT con control de acceso basado en roles (RBAC): Administrador (Dueño) y Empleado (Staff).
RF13: El sistema debe permitir al Administrador recuperar su contraseña mediante un
RF14: El sistema deberá poder registrar opiniones y calificaciones a los diferentes servicios.
RF15: El sistema debe registrar los turnos Solicitados , Cancelados y Realizados.
REVISAR ESTOS OTROS POSIBLES RFS
RF1: El sistema debe permitir el registro de un nuevo comercio (Tenant) creando un identificador único.
RF2: El sistema debe permitir el inicio de sesión mediante email y contraseña, generando un token JWT.
RF3: El sistema debe permitir la recuperación de contraseña mediante un enlace seguro enviado por email.
RF4: El sistema debe manejar roles de usuario: "Administrador" (dueño) y "Empleado" (staff con permisos limitados).
RF5: El sistema debe permitir configurar los días laborables y los horarios de apertura/cierre del local.
RF6: El sistema debe permitir crear, editar y eliminar "Servicios" (nombre, descripción, duración, precio, tiempo de limpieza/buffer).
RF7: El sistema debe permitir crear perfiles de "Empleados" y asignarles qué servicios específicos pueden realizar.
RF8: El sistema debe permitir bloquear fechas o rangos horarios excepcionales (feriados, vacaciones).
RF9: El sistema debe mostrar al cliente un catálogo de servicios disponibles con sus respectivos precios y duraciones.
RF10: El algoritmo debe calcular y mostrar únicamente los horarios libres, cruzando la duración del servicio, los turnos existentes y los horarios del local.
RF11: El sistema debe crear un bloqueo temporal (Soft Lock) del horario al momento en que el cliente inicia la reserva (ej. por 10 minutos) para evitar colisiones.
RF12: El sistema debe recopilar los datos del cliente (nombre, teléfono, email) para asociarlos a la reserva.
RF13: El sistema debe crear la reserva en estado "Pendiente" y generar un token único de confirmación.
RF14: El sistema debe cancelar automáticamente la reserva y liberar el horario si el cliente no confirma en el tiempo estipulado.
RF15: El sistema debe enviar un email transaccional con el enlace para confirmar el turno.
RF16: El sistema debe redirigir al checkout de MercadoPago para el cobro de una seña (si el admin lo requiere).
RF17: El sistema debe recibir webhooks de MercadoPago para cambiar el estado de la reserva a "Confirmada" tras el pago.
RF18: El sistema debe enviar un email de recordatorio 24 horas antes de la cita.
RF19: El sistema debe renderizar un calendario (vista diaria/semanal/mensual) con todos los turnos agendados.
RF20: El sistema debe permitir al administrador cambiar el estado de un turno manualmente (Completado, Cancelado, No-Show).
RF21: El sistema debe permitir al administrador ingresar turnos manualmente (para clientes presenciales o telefónicos).
RF22: El sistema debe mostrar métricas clave: cantidad de turnos del mes, ingresos proyectados y tasa de ausentismo.
RF23: El sistema debe permitir exportar la lista de clientes (CSV) para uso del comercio.
—----------------------------------------------------------------------------------------------------------------------------
Arquitectura del Sistema y Base de Datos
La arquitectura de esta plataforma SaaS ha sido diseñada bajo los principios de alta cohesión, escalabilidad horizontal y eficiencia de recursos, considerando los objetivos de un Producto Mínimo Viable (MVP) y las restricciones operativas de un desarrollo ágil. Se adopta un enfoque API-First combinado con una arquitectura Multi-tenant a nivel lógica de datos. Esto garantiza que el sistema posea la flexibilidad necesaria para incorporar futuras integraciones (como pasarelas de pago o notificaciones multicanal) y la robustez para dar soporte a múltiples comercios, manteniendo un aislamiento estricto y seguro de la información de cada inquilino.
Para materializar esta visión, la selección de la pila tecnológica prioriza herramientas modernas, de alto rendimiento y tipado estático, con el fin de minimizar errores en tiempo de ejecución y reducir la deuda técnica. El ecosistema se divide en un frontend optimizado para dispositivos móviles mediante el estándar de Aplicación Web Progresiva (PWA), garantizando accesibilidad y baja fricción para el usuario final. Por su parte, el núcleo de negocio reside en un backend modular y escalable construido en TypeScript, respaldado obligatoriamente por un motor de base de datos relacional (PostgreSQL).                                                                   Esta decisión de persistencia es innegociable, ya que asegura el cumplimiento de las propiedades transaccionales ACID (Atomicidad, Consistencia, Aislamiento y Durabilidad), las cuales son críticas para prevenir colisiones de horarios, manejar la concurrencia del motor de reservas y proteger la integridad financiera del sistema.