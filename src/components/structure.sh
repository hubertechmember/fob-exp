#!/bin/bash

# Przejdź do katalogu projektu
cd /Users/hubertwolanin/Documents/projekty

# Utwórz strukturę katalogów dla komponentów
mkdir -p src/components/{onboarding,session,dashboard,education,common,ui,charts}

# Utwórz katalogi dla zasobów statycznych
mkdir -p src/assets/{images,icons}

# Utwórz katalogi dla logiki biznesowej
mkdir -p src/services
mkdir -p src/hooks
mkdir -p src/utils
mkdir -p src/context

# Nadaj uprawnienia wykonywania
chmod +x src/components/structure.sh 