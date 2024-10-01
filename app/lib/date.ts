export const convertDateToJaYYMMDD = (date: string): string => {
	const d = new Date(date);

	return new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(d);
};
