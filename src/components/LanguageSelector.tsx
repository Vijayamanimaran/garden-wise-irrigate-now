
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage, Language, languageNames } from "@/contexts/LanguageContext";
import { GlobeIcon } from "lucide-react";

const LanguageSelector = () => {
  const { language, setLanguage, translate } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <GlobeIcon className="h-4 w-4 text-gray-500" />
      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
        <SelectTrigger className="w-[180px]" aria-label={translate("language")}>
          <SelectValue placeholder={translate("language")} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(languageNames).map(([code, name]) => (
            <SelectItem key={code} value={code}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
