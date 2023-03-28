export type ViewInfo = Readonly<{
    title?: string;
    icon?: string;
  }>;
  
  export type ViewInfoMap = Readonly<Record<string, ViewInfo | undefined>>;
  export type RequiredViewInfoMap = Readonly<Record<string, Required<ViewInfo>>>;
  
  const views: ViewInfoMap = {
    '/hello': { icon: 'la la-globe', title: 'Hola ejercicio' },
    '/about': { icon: 'la la-file', title: 'Opciones' },
    '/edificio': { icon: 'la la-list', title: 'Edificio' },
    '/dependencia': { icon: 'la la-list', title: 'Dependencia' },
  };
  
  export default views;