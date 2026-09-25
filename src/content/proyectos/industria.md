---
# PROYECTO DE EJEMPLO: sustituir por un proyecto real.
title: Control de producción y trazabilidad por lote
sector: Industria
summary: Los operarios registran órdenes de fabricación, consumos y paradas desde tablets en planta, y cada lote queda trazado de la materia prima al cliente.
categories: [web, dashboard]
tags: [Aplicación web, Dashboard]
cover: ../../assets/photos/proyecto-industria.jpg
coverAlt: Técnica trabajando con un portátil en una planta industrial
metrics:
  - { value: "100 %", label: "lotes trazados" }
  - { value: "−35 %", label: "tiempo en partes de producción" }
challenge: Los partes de producción se rellenaban en papel y se pasaban a Excel al final de cada turno. Localizar un lote ante una reclamación podía llevar días.
solution: Una aplicación web para tablets en planta con la que los operarios registran órdenes de fabricación, consumos y paradas en el momento. Cada lote queda trazado de principio a fin y la dirección ve la eficiencia de cada línea en un panel.
results:
  - { value: "100 %", label: "lotes trazados de principio a fin" }
  - { value: "−35 %", label: "tiempo dedicado a partes de producción" }
  - { value: "Minutos", label: "para localizar un lote ante una reclamación" }
stack: [Vue.js, Node.js, PostgreSQL, Docker]
duration: 4 meses
featured: true
order: 2
---

## Qué construimos

- Registro de órdenes de fabricación, consumos y paradas desde tablet.
- Trazabilidad completa por lote, de la materia prima al cliente.
- Panel de eficiencia por línea y por turno.
- Exportación automática de la producción al ERP.
