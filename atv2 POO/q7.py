class controleedeAudio:
    def __init__(self):
        self.volume = 0

    def aumentar_volume(self):
        if self.volume < 10:
            self.volume += 1

        return self.volume

    def diminuir_volume(self):
        if self.volume > 0:
            self.volume -= 1

        return self.volume

    def ler_volume(self):
        print("Volume:", self.volume)


controle = controleedeAudio()
controle.volume = 2

# Aumenta volume em 1
controle.volume = controle.aumentar_volume()
controle.ler_volume()

# Diminui volume em 1
controle.volume = controle.diminuir_volume()
controle.ler_volume()