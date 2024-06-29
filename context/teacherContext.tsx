// context/MyContext.tsx
import { isTeacher } from "@/lib/actions/user.action";
import { useAuth } from "@clerk/nextjs";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface MyContextProps {
  checkTeacher: boolean;
  setCheckTeacher: (value: boolean) => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [checkTeacher, setCheckTeacher] = useState<boolean>(false);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchData = async (userId: string | undefined | null) => {
      if (!userId) return;
      try {
        const teacher = await isTeacher({ userId });
        setCheckTeacher(teacher);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(userId);
  }, [userId]);

  return (
    <MyContext.Provider value={{ checkTeacher, setCheckTeacher }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = (): MyContextProps => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
