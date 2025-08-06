import { Info, Settings } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <h1 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent">
              Тестовое задание
            </span>
            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
              Аналитика продаж
            </span>
          </h1>

          <div className="ml-auto flex items-center gap-4">
            <button
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="Настройки"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="Информация"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
