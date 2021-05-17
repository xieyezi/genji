import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'

const extensions = ['.js', '.ts', '.vue']
const { root } = path.parse(process.cwd())

function external(id) {
	return !id.startsWith('.') && !id.startsWith(root)
}

function getEsbuild(target) {
	return esbuild({
		minify: false,
		target,
		tsconfig: path.resolve('./tsconfig.json')
	})
}

function createDeclarationConfig(input, output) {
	return {
		input,
		output: {
			dir: output
		},
		external,
		plugins: [typescript({ declaration: true, outDir: output })]
	}
}

function createESMConfig(input, output) {
	return {
		input,
		output: { file: output, format: 'esm' },
		external,
		plugins: [
			resolve({ extensions }),
			getEsbuild('node12'),
			sizeSnapshot(),
			terser()
		]
	}
}

export default function() {
	return [
		createDeclarationConfig('src/index.ts', 'dist'),
		createESMConfig('src/index.ts', 'dist/esm/index.js')
	]
}
