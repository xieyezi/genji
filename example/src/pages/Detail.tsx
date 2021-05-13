import React from 'react'
import { useStore } from '../../../src/create'

const Detail: React.FC = () => {
	const state = useStore({ number: 1, name: 'jufei' })

	return (
		<>
			<div className="show">
				<div> 你的姓名是: {state.name} </div>
				<div>{new Array(state.number).fill(0).map(() => '✨')}</div>
			</div>
			<div className="constrol">
				<div>
					{' '}
					<button onClick={() => state.number++}>✨++</button>{' '}
				</div>
				<div>
					{' '}
					<button onClick={() => state.number--}>✨--</button>{' '}
				</div>
				<input
					placeholder="姓名"
					value={state.name}
					onChange={(e: any) => (state.name = e.target.value)}
				/>
			</div>
		</>
	)
}

export default Detail
