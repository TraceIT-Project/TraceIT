---
# PROYECTO DE EJEMPLO: sustituir por un proyecto real.
title: Cuadro de mando comercial conectado al ERP y al CRM
sector: Distribución comercial
summary: Ventas, márgenes y previsión por zona, comercial y cliente en un cuadro de mando que se actualiza solo cada noche.
categories: [dashboard, integracion]
tags: [Dashboard, Integración]
cover: ../../assets/photos/proyecto-comercial.jpg
coverAlt: Pantalla con gráficas e indicadores de negocio
metrics:
  - { value: "6 h → 0", label: "semanales preparando informes" }
  - { value: "Diario", label: "datos actualizados solos" }
challenge: Cada lunes, el equipo comercial dedicaba una mañana a cruzar datos del ERP y del CRM en Excel para preparar el informe de ventas, y cada departamento manejaba cifras distintas.
solution: Conectamos el ERP y el CRM a una base de datos analítica que se actualiza cada noche, y construimos un cuadro de mando con ventas, márgenes y previsión por zona, comercial y cliente.
results:
  - { value: "6 h → 0", label: "semanales preparando informes" }
  - { value: "Diario", label: "datos actualizados automáticamente" }
  - { value: "1", label: "única versión de las cifras para toda la empresa" }
stack: [Python, PostgreSQL, React, Power BI]
duration: 3 meses
featured: true
order: 3
---

## Qué construimos

- Integración automática de datos del ERP y del CRM cada noche.
- Cuadro de mando de ventas, márgenes y previsión.
- Vistas por zona, comercial y cliente, con permisos según el perfil.
- Informe semanal que se envía solo a dirección.
