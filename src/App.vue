<template>
  <main class="p-6 max-w-2xl mx-auto space-y-4">
    <h1>디자인 패턴 (Builder / Facade / Strategy)</h1>

    <section class="space-x-8">
      <button @click="runBuilder" class="btn">Builder 실행</button>
      <button @click="runFacade" class="btn">Facade 실행</button>
      <button @click="runStrategy" class="btn">Strategy 실행</button>
      <button @click="clear" class="btn secondary">로그 지우기</button>
    </section>

    <pre class="log" v-if="logs.length">{{ logs.join('\n') }}</pre>
    <p v-else class="muted">버튼을 눌러 실행 결과를 확인하세요. (콘솔에도 동일 로그가 찍힙니다)</p>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { demonstrateBuilderPattern } from './patterns/Builder'
import { demonstrateFacadePattern } from './patterns/facade'
import { demonstrateStrategyPattern } from './patterns/strategy'

const logs = ref<string[]>([])

function push(lines: string[]) {
  logs.value.push(...lines)
  console.log(lines.join('\n'))
}
function runBuilder() { push(["=== Builder ===", ...demonstrateBuilderPattern(), ""]) }
function runFacade() { push(["=== Facade ===", ...demonstrateFacadePattern(), ""]) }
function runStrategy() { push(["=== Strategy ===", ...demonstrateStrategyPattern(), ""]) }
function clear() { logs.value = []; console.clear() }
</script>

<style scoped>
.btn{padding:8px 14px;border:1px solid #999;border-radius:8px;cursor:pointer;background: #ffcc00
}
.btn:hover{background: #ffcc00
}
.btn.secondary{background: #ffcc00
}
.log{white-space:pre-wrap;background:#0b0b0b;color:#e6f1ff;padding:12px;border-radius:10px;border:1px solid #222}
.muted{color:#777}
</style>
