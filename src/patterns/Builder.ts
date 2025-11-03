class Computer {
    public cpu = "";
    public ram = "";
    public storage = "";
    public gpu = "";

    getTotalPrice(): number {
        let price = 0;
        if (this.cpu.includes("i9") || this.cpu.includes("Ryzen 9")) price += 500000;
        else if (this.cpu.includes("i7") || this.cpu.includes("Ryzen 7")) price += 300000;
        else if (this.cpu.includes("Ryzen 5") || this.cpu.includes("i5")) price += 180000;

        if (this.ram.includes("64GB")) price += 400000;
        else if (this.ram.includes("32GB")) price += 200000;
        else if (this.ram.includes("16GB")) price += 100000;
        else if (this.ram.includes("8GB")) price += 50000;

        const s = this.storage.toUpperCase();
        if (s.includes("2TB") && s.includes("SSD")) price += 200000;
        else if (s.includes("1TB") && s.includes("SSD")) price += 150000;
        else if (s.includes("512GB") && s.includes("SSD")) price += 100000;
        else if (s.includes("256GB") && s.includes("SSD")) price += 70000;
        else if (s.includes("2TB") && s.includes("HDD")) price += 80000;

        if (this.gpu.includes("4090")) price += 2000000;
        else if (this.gpu.includes("4080")) price += 1500000;
        else if (this.gpu.includes("3070")) price += 800000;
        else if (this.gpu.includes("3060")) price += 500000;
        else if (this.gpu.includes("1660")) price += 250000;

        return price;
    }

    getSpecs(): string {
        return `Computer Specs:
- CPU: ${this.cpu || "미선택"}
- RAM: ${this.ram || "미선택"}
- Storage: ${this.storage || "미선택"}
- GPU: ${this.gpu || "미선택"}
- Total Price: ₩${this.getTotalPrice().toLocaleString()}`;
    }
}

interface ComputerBuilder {
    setCpu(cpu: string): ComputerBuilder;
    setRam(ram: string): ComputerBuilder;
    setStorage(storage: string): ComputerBuilder;
    setGpu(gpu: string): ComputerBuilder;
    build(): Computer;
}

class ConcreteComputerBuilder implements ComputerBuilder {
    private computer: Computer;

    constructor() {
        this.computer = new Computer();
    }

    setCpu(cpu: string): ComputerBuilder {
        this.computer.cpu = cpu;
        console.log(`CPU 설정: ${cpu}`);
        return this;
    }
    setRam(ram: string): ComputerBuilder {
        this.computer.ram = ram;
        console.log(`RAM 설정: ${ram}`);
        return this;
    }
    setStorage(storage: string): ComputerBuilder {
        this.computer.storage = storage;
        console.log(`Storage 설정: ${storage}`);
        return this;
    }
    setGpu(gpu: string): ComputerBuilder {
        this.computer.gpu = gpu;
        console.log(`GPU 설정: ${gpu}`);
        return this;
    }
    build(): Computer {
        console.log("컴퓨터 빌드 완료!");
        const result = this.computer;
        this.computer = new Computer();
        return result;
    }
}

class ComputerDirector {
    private builder: ComputerBuilder;
    constructor(builder: ComputerBuilder) {
        this.builder = builder;
    }

    buildGamingComputer(): Computer {
        console.log("\n=== 게이밍 컴퓨터 빌드 시작 ===");
        return this.builder
            .setCpu("Intel i9-13900K")
            .setRam("32GB DDR5")
            .setStorage("1TB NVMe SSD")
            .setGpu("RTX 4090")
            .build();
    }

    buildOfficeComputer(): Computer {
        console.log("\n=== 사무용 컴퓨터 빌드 시작 ===");
        return this.builder
            .setCpu("Intel i7-13700")
            .setRam("16GB DDR4")
            .setStorage("512GB SSD")
            .setGpu("RTX 3060")
            .build();
    }

    buildBudgetComputer(): Computer {
        console.log("\n=== 저가형 컴퓨터 빌드 시작 ===");
        return this.builder
            .setCpu("AMD Ryzen 5")
            .setRam("8GB DDR4")
            .setStorage("256GB SSD")
            .setGpu("GTX 1660")
            .build();
    }
}

export function demonstrateBuilderPattern(): string[] {
    const results: string[] = [];
    results.push("🏗️ Builder 패턴 데모 시작\n");

    const b = new ConcreteComputerBuilder();
    const custom = b
        .setCpu("AMD Ryzen 9")
        .setRam("64GB DDR5")
        .setStorage("2TB SSD")
        .setGpu("RTX 4080")
        .build();
    results.push(custom.getSpecs(), "");

    const director = new ComputerDirector(new ConcreteComputerBuilder());
    const gaming = director.buildGamingComputer();
    results.push(gaming.getSpecs(), "");

    const office = director.buildOfficeComputer();
    results.push(office.getSpecs(), "");

    const budget = director.buildBudgetComputer();
    results.push(budget.getSpecs());

    return results;
}
