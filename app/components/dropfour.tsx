"use client"

import React, { useCallback, useState } from 'react'

const CELL_SIZE = 100
const CELL_MARGIN = 20

enum CellValue {
    EMPTY = 0,
    YELLOW = 1,
    RED = 2
}

export const { EMPTY, YELLOW, RED } = CellValue

const BOARD_COLOR = '#0002ff'
const EMPTY_COLOR = '#111122'
const YELLOW_COLOR = '#ccdd22'
const RED_COLOR = '#ee3322'

export interface CellProps {
    value: CellValue
}

export function Cell(props: CellProps) {
    let color = EMPTY_COLOR
    if (props.value === YELLOW) {
        color = YELLOW_COLOR
    } else if (props.value === RED) {
        color = RED_COLOR
    }

    return <div style={{ width: CELL_SIZE, height: CELL_SIZE, backgroundColor: BOARD_COLOR, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: CELL_SIZE - CELL_MARGIN, height: CELL_SIZE - CELL_MARGIN, backgroundColor: color, borderRadius: CELL_SIZE / 2 }}></div>
    </div>
}

export interface DropFourGameBoardProps {
    board: CellValue[][]
    onCellClick: (row: number, col: number) => void
}

function DropFourGameBoard(props: DropFourGameBoardProps) {
    const { board } = props

    return (
        <table>
            <tbody>
                {
                    board.map((row, i) => {
                        return <tr key={i}>
                            {
                                row.map((cell, j) => {
                                    return <td key={j} onClick={() => props.onCellClick(i, j)}><Cell value={cell} /></td>
                                })
                            }
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

function DropFourGame() {
    const defaultBoard = [
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [YELLOW, EMPTY, EMPTY, EMPTY, EMPTY, YELLOW, RED],
    ]

    const [board, setBoard] = useState(() => JSON.parse(JSON.stringify(defaultBoard))) // hacky deep copy

    const onClickCell = useCallback((row: number, col: number) => {
        console.log(`Clicked on cell (${row}, ${col})`)
    }, [])

    return (
        <DropFourGameBoard board={board} onCellClick={onClickCell} />
    )
}

export default DropFourGame
