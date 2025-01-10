FOBOS - design algorytmu wirtualnego asystenta terapeuty


Do decydowania o tym, czy użytkownik zostanie dopuszczony do następnej sceny (pod kątem intensywności) należy użyć wzoru:
 VAT<sub>score</sub> = (2 * (SUD<sub>post</sub> - SUD<sub>pre</sub>) / (Length<sub>ratio</sub> + Awareness<sub>ratio</sub>) + SUD<sub>post</sub>) / 2

gdzie:

- VAT_score - końcowy wynik służący do podejmowania decyzji o kierunku następnej sceny
- SUD_post - SUD po ekspozycji
- SUD_pre - SUD przed ekspozycją
- Length_ratio - ułamek określający jak długo była oglądana scena (1 to pełna scena)
- Awareness_ratio - ułamek określający ile wystąpień czuwaka zostało zauważonych przez pacjenta (1 to wszystkie zostały zauważone)

Powyższy wzór zaprojektowany został tak, aby pierwszy człon istotnie zwiększał różnice SUD brane po uwagę jeśli pacjent nie widzi czuwaków (czyli zamyka oczy) lub przerywa ekspozycję (ten człon bierze pod uwagę wyjściowy stan pacjenta). Ten człon równania zostaje uśredniony z SUD_post aby wyznaczyć poekspozycyjny znormalizowany poziom SUD, który został podstawą do tworzenia następujących rekomendacji.

VAT_score (czyli poekspozycyjny znormalizowany poziom SUD) na poziomie 30 lub mniej, oznacza decyzję "idź dalej". VAT_score na poziomie powyżej 30 ale równe lub poniżej 40 oznacza decyzję "zostań w danej scenie". VAT_score powyżej 40 oznacza decyzję "wróć do poprzedniej".


