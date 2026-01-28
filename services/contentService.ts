import { portfolioData as staticPortfolioData } from '../data/portfolioData';
import type { PortfolioData } from '../types';

const STORAGE_KEY = 'portfolioData';

/**
 * Recursively validates and sanitizes a data object against a template.
 * It ensures that every property in the returned object has the correct type (object, array, string, etc.),
 * preventing crashes from data corruption at any level of nesting.
 * @param template The known-good data structure.
 * @param data The potentially corrupt data to validate.
 * @returns A sanitized data object that is safe to use in the application.
 */
const recursiveSanitize = (template: any, data: any): any => {
    // If the template is a primitive type, ensure the data matches. If not, return the template's value.
    if (typeof template !== 'object' || template === null) {
        return typeof template === typeof data ? data : template;
    }

    // If the template is an array, ensure the data is also an array.
    if (Array.isArray(template)) {
        if (!Array.isArray(data)) {
            return template; // Return default template array if data is not an array.
        }
        
        // If the template array has a shape (i.e., not empty), validate each item in the data array.
        if (template.length > 0) {
            const itemTemplate = template[0];
            return data
                .map(item => recursiveSanitize(itemTemplate, item))
                .filter(item => item !== null && typeof item === typeof itemTemplate); // Ensure items are valid
        }
        
        // If template is an empty array, just ensure data is an array.
        return data;
    }

    // If the template is an object, ensure every key from the template exists and has the correct type.
    const sanitizedObject: { [key: string]: any } = {};
    for (const key in template) {
        if (Object.prototype.hasOwnProperty.call(template, key)) {
            const templateValue = template[key];
            const dataValue = data && Object.prototype.hasOwnProperty.call(data, key) ? data[key] : undefined;
            
            if (dataValue !== undefined) {
                sanitizedObject[key] = recursiveSanitize(templateValue, dataValue);
            } else {
                sanitizedObject[key] = templateValue; // Key missing in data, use template's default.
            }
        }
    }

    return sanitizedObject;
};

/**
 * Top-level validation function.
 * @param data The data loaded from localStorage.
 * @returns A fully sanitized PortfolioData object or null if the data is fundamentally invalid.
 */
const validateAndSanitizeData = (data: any): PortfolioData | null => {
    if (typeof data !== 'object' || data === null) {
        return null; // Data is not even an object.
    }
    return recursiveSanitize(staticPortfolioData, data);
};

/**
 * Fetches portfolio data, prioritizing data from localStorage.
 * Includes a robust, recursive validation and sanitization step to prevent app crashes from deep data corruption.
 * @returns A promise that resolves with the valid portfolio data.
 */
export const fetchPortfolioData = (): Promise<PortfolioData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const storedDataString = localStorage.getItem(STORAGE_KEY);
        if (storedDataString) {
          const storedData = JSON.parse(storedDataString);
          const validatedData = validateAndSanitizeData(storedData);

          if (validatedData) {
            resolve(validatedData);
          } else {
            // Data is fundamentally corrupt (e.g., not an object), reset everything.
            console.error("Portfolio data from localStorage is severely corrupted. Resetting to default.");
            localStorage.removeItem(STORAGE_KEY);
            resolve(staticPortfolioData);
          }
        } else {
          // No data in storage, use the default.
          resolve(staticPortfolioData);
        }
      } catch (error) {
        // Any error during parsing or validation triggers a reset.
        console.error("Failed to parse or validate portfolio data from localStorage. Resetting to default.", error);
        localStorage.removeItem(STORAGE_KEY);
        resolve(staticPortfolioData);
      }
    }, 500);
  });
};

/**
 * Saves portfolio data to localStorage.
 * @param data The portfolio data to save.
 */
export const savePortfolioData = (data: PortfolioData): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Failed to save portfolio data to localStorage", error);
    }
};

/**
 * Resets portfolio data by removing it from localStorage and returning the static default.
 * @returns The original static portfolio data.
 */
export const resetPortfolioData = (): PortfolioData => {
    localStorage.removeItem(STORAGE_KEY);
    return staticPortfolioData;
};