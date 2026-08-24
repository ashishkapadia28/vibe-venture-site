"use client";

export function ManagePreferencesButton() {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("cookie_consent");
        localStorage.removeItem("cookie_preferences");
        window.location.reload();
      }}
      className="px-6 py-3 rounded-full bg-white border border-border text-foreground font-medium text-[15px] transition-all duration-300 hover:bg-gray-50 shadow-sm"
    >
      Reset Cookie Preferences
    </button>
  );
}
