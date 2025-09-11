import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';

type Licitacion = any; // Cambia 'any' por el tipo real si lo tienes

interface HomeTenantContextType {
  selectedLicitacion: Licitacion | null;
  setSelectedLicitacion: Dispatch<SetStateAction<Licitacion | null>>;
}

const HomeTenantContext = createContext<HomeTenantContextType | null>(null);

interface HomeTenantProviderProps {
  children: ReactNode;
}

export const HomeTenantProvider = ({ children }: HomeTenantProviderProps) => {
  const [selectedLicitacion, setSelectedLicitacion] =
    useState<Licitacion | null>(null);

  return (
    <HomeTenantContext.Provider
      value={{ selectedLicitacion, setSelectedLicitacion }}
    >
      {children}
    </HomeTenantContext.Provider>
  );
};

export const useHomeTenantContext = () => {
  const context = useContext(HomeTenantContext);
  if (context === null) {
    throw new Error(
      'useHomeTenantContext debe usarse dentro de HomeTenantProvider'
    );
  }
  return context;
};
