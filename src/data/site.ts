// Datos globales de la web. Cambia aquí y se actualiza en todas las páginas.
// Los marcados como PROVISIONAL son inventados y hay que sustituirlos.

export const SITE = {
  name: "TraceIT",
  url: "https://traceit.es",
  email: "traceitagency@gmail.com",
  phone: "652 30 85 36", // PROVISIONAL
  phoneHref: "+34652308536", // PROVISIONAL (mismo número con prefijo +34, sin espacios)
  linkedin: "https://www.linkedin.com/company/traceit", // PROVISIONAL
  // Clave de acceso de https://web3forms.com. Mientras empiece por "TU_",
  // el formulario abre el programa de correo del usuario como alternativa.
  web3formsKey: "TU_ACCESS_KEY_DE_WEB3FORMS",
  legal: {
    razonSocial: "TraceIT Software, S.L.", // PROVISIONAL
    cif: "B00000000", // PROVISIONAL
    domicilio: "Calle Ejemplo, 1, 29001 Málaga", // PROVISIONAL
    registro: "Registro Mercantil de Málaga, tomo 0000, folio 00, hoja MA-000000", // PROVISIONAL
  },
};

// Teléfono para mostrar: espacios de no separación para que el número nunca se parta en dos líneas
export const PHONE_TEXT = SITE.phone.replaceAll(" ", " ");

export const NAV = [
  { id: "servicios", href: "/servicios/", label: "Servicios" },
  { id: "proyectos", href: "/proyectos/", label: "Proyectos" },
  { id: "proceso", href: "/como-trabajamos/", label: "Cómo trabajamos" },
  { id: "nosotros", href: "/nosotros/", label: "Nosotros" },
];

export const SERVICE_LINKS = [
  { href: "/servicios/#aplicaciones-web", label: "Aplicaciones web" },
  { href: "/servicios/#apps-moviles", label: "Apps móviles" },
  { href: "/servicios/#intranets", label: "Intranets" },
  { href: "/servicios/#dashboards", label: "Dashboards" },
  { href: "/servicios/#integraciones", label: "Integraciones" },
  { href: "/servicios/#modernizacion", label: "Modernización" },
  { href: "/servicios/#mantenimiento", label: "Mantenimiento" },
];

// Tecnologías del carrusel y de la sección de tecnologías (portada y servicios).
// icon: nombre del logo en src/data/icons.json (brand: true = logotipo de marca).
// color: color oficial de la marca, usado en las baldosas.
export const TECH = {
  frontend: [
    { name: "HTML5", icon: "html5", brand: true, color: "#E34F26" },
    { name: "CSS3", icon: "css3", brand: true, color: "#1572B6" },
    { name: "JavaScript", icon: "javascript-color", brand: true, color: "#F7DF1E" },
    { name: "TypeScript", icon: "typescript", brand: true, color: "#3178C6" },
    { name: "React", icon: "react", brand: true, color: "#61DAFB" },
    { name: "Angular", icon: "angular", brand: true, color: "#0F0F11" },
    { name: "Vue.js", icon: "vuedotjs", brand: true, color: "#4FC08D" },
    { name: "Next.js", icon: "nextdotjs", brand: true, color: "#000000" },
  ],
  backend: [
    { name: "Java", icon: "java", brand: true, color: "#007396" },
    { name: "Spring Boot", icon: "springboot", brand: true, color: "#6DB33F" },
    { name: "Node.js", icon: "nodedotjs", brand: true, color: "#5FA04E" },
    { name: ".NET", icon: "dotnet", brand: true, color: "#512BD4" },
    { name: "PHP", icon: "php", brand: true, color: "#777BB4" },
    { name: "Laravel", icon: "laravel", brand: true, color: "#FF2D20" },
    { name: "Python", icon: "python", brand: true, color: "#3776AB" },
  ],
  datos: [
    { name: "SQL Server", icon: "microsoftsqlserver", brand: true, color: "#CC2927" },
    { name: "PostgreSQL", icon: "postgresql", brand: true, color: "#4169E1" },
    { name: "MySQL", icon: "mysql", brand: true, color: "#4479A1" },
    { name: "Power BI", icon: "powerbi", brand: true, color: "#F2C811" },
  ],
  cloud: [
    { name: "Azure", icon: "azure", brand: true, color: "#0078D4" },
    { name: "AWS", icon: "amazonwebservices", brand: true, color: "#232F3E" },
    { name: "Google Cloud", icon: "googlecloud", brand: true, color: "#4285F4" },
    { name: "Docker", icon: "docker", brand: true, color: "#2496ED" },
  ],
};

export const PROJECT_CATEGORIES = {
  web: "Aplicación web",
  movil: "App móvil",
  intranet: "Intranet",
  dashboard: "Dashboard",
  integracion: "Integración y automatización",
  modernizacion: "Modernización",
} as const;
