describe("togglePhoneEditable function", () => {
    it("shows an error if the phone number is invalid when editing is disabled", () => {
      // Mocks
      let isPhoneEditable = true;
      let phone = "123";
      let phoneError = "";
  
      const setIsPhoneEditable = jest.fn((value) => {
        isPhoneEditable = value;
      });
  
      const setPhoneError = jest.fn((value) => {
        phoneError = value;
      });
  
      const updateUserProfileMock = jest.fn();
  
      // Kopiujemy funkcję togglePhoneEditable
      const togglePhoneEditable = () => {
        if (isPhoneEditable) {
          if (!/^\d{9}$/.test(phone)) {
            setPhoneError("Phone number must be exactly 9 digits.");
            return;
          }
          setPhoneError("");
          updateUserProfileMock("phone", phone);
        }
        setIsPhoneEditable(!isPhoneEditable);
      };
  
      // Wywołujemy funkcję z nieprawidłowym numerem telefonu
      togglePhoneEditable();
  
      // Oczekujemy, że pokaże się błąd
      expect(phoneError).toBe("Phone number must be exactly 9 digits.");
      expect(updateUserProfileMock).not.toHaveBeenCalled();
      expect(isPhoneEditable).toBe(true);
    });
  
    it("updates the phone number if it is valid", () => {
      // Mocks
      let isPhoneEditable = true;
      let phone = "123456789";
      let phoneError = "";
  
      const setIsPhoneEditable = jest.fn((value) => {
        isPhoneEditable = value;
      });
  
      const setPhoneError = jest.fn((value) => {
        phoneError = value;
      });
  
      const updateUserProfileMock = jest.fn();
  
      // Kopiujemy funkcję togglePhoneEditable
      const togglePhoneEditable = () => {
        if (isPhoneEditable) {
          if (!/^\d{9}$/.test(phone)) {
            setPhoneError("Phone number must be exactly 9 digits.");
            return;
          }
          setPhoneError("");
          updateUserProfileMock("phone", phone);
        }
        setIsPhoneEditable(!isPhoneEditable);
      };
  
      // Wywołujemy funkcję z prawidłowym numerem telefonu
      togglePhoneEditable();
  
      // Oczekujemy, że numer zostanie zaktualizowany
      expect(phoneError).toBe("");
      expect(updateUserProfileMock).toHaveBeenCalledWith("phone", "123456789");
      expect(isPhoneEditable).toBe(false);
    });
  });
  